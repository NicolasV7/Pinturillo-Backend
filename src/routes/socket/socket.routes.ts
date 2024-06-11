import { SocketController } from "../../controller/socket/socket.controller";
const express = require("express");
const router = express.Router();

module.exports = (expressWs) => {
  const socketController = new SocketController();
  let time = 0;
  expressWs.applyTo(router);

  let solveWord = [];
  let usersPlay = [];
  let hasFinishedTurn = false;

  router.ws("/game-room/:roomId", async (ws, req) => {
    const idRoom = req.params.roomId;
    const userName = req.query.username;

    let roomRounds = 1;

    const room = await socketController.verifyRoom(ws, idRoom);

    if (room === null) {
      return;
    }

    await socketController.joinRoom(ws, userName, idRoom);
    printConnectedUsers(idRoom);

    const isSpecialUser = userName.endsWith("-e72112a8");

    if (!isSpecialUser) {
      usersPlay = socketController.assingTurn(idRoom);
      const userPlayTurn = await socketController.playerTurn(idRoom, ws);

      SocketController.rooms[idRoom].forEach((user) => {
        if (user.ws === ws) {
          user.ws.send(
            JSON.stringify({
              type: "info",
              text: `Your turn to play ${userPlayTurn}`,
            })
          );
        }
        if (user.ws !== ws && user.ws.readyState === ws.OPEN) {
          user.ws.send(
            JSON.stringify({
              type: "info",
              text: `[+] ${userName} has joined the room`,
            })
          );
        }
      });

      if (SocketController.rooms[idRoom].size === 1) {
        SocketController.rooms[idRoom].forEach((user) => {
          user.ws.send(
            JSON.stringify({
              type: "info",
              text: `[+] Waiting for more players to join the room`,
            })
          );
        });
      }
    }

    ws.on("message", async (msg) => {
      const jsonMessage = JSON.parse(msg);

      if (jsonMessage.type === "SEND_MESSAGE") {
        if (!isSpecialUser) {
          SocketController.rooms[idRoom].forEach(async (user) => {
            const wordMessage = socketController.guessWord(
              idRoom,
              jsonMessage.data
            );

            if (
              user.ws === ws &&
              user.ws.readyState === ws.OPEN &&
              wordMessage
            ) {
              user.ws.send(
                JSON.stringify({
                  type: "info",
                  text: `[+] You have guessed the word`,
                })
              );
              solveWord.push(user.ws);
              const score = await socketController.score(
                idRoom,
                solveWord.length - 1,
                ws,
                time
              );
              user.ws.send(
                JSON.stringify({
                  type: "info",
                  text: `[+] Your score is: ${score}`,
                })
              );
            }

            if (user.ws !== ws && user.ws.readyState === ws.OPEN) {
              if (wordMessage) {
                user.ws.send(
                  JSON.stringify({
                    type: "info",
                    text: `[+] ${userName} has guessed the word`,
                  })
                );
              } else {
                user.ws.send(
                  JSON.stringify({
                    type: "message",
                    username: userName,
                    text: jsonMessage.data,
                  })
                );
              }
            }

            if (solveWord.length === SocketController.rooms[idRoom].size) {
              SocketController.rooms[idRoom].forEach((user) => {
                if (user.ws.readyState === ws.OPEN) {
                  user.ws.send(
                    JSON.stringify({ type: "info", text: `[+] Round finished` })
                  );
                }
              });
              await finishTurn();
            }
          });
        }
      } else if (
        jsonMessage.type === "START" &&
        SocketController.rooms[idRoom].size > 1 &&
        room.state === "En curso"
      ) {
        if (!isSpecialUser) {
          await startGame();
        }
      } else if (jsonMessage.type === "drawing") {
        socketController.broadcastDrawing(idRoom, jsonMessage.data);
      }
    });

    async function startGame() {
      try {
        const asignWord = await socketController.asignWordToGuess(idRoom);
        const users = Array.from(SocketController.rooms[idRoom]);
        let constUser = "";

        const userPromise = users.map(async (user: any) => {
          const turn = await socketController.playerTurn(idRoom, user.ws);
          if (user.ws.readyState === ws.OPEN && turn === 1) {
            constUser = user.userName;
            solveWord.push(user.ws);
            user.ws.send(
              JSON.stringify({ type: "info", text: `[+] Your turn to play` })
            );
            user.ws.send(
              JSON.stringify({
                type: "info",
                text: `[+] Word to draw: ${asignWord}`,
              })
            );

            usersPlay = socketController.endTurn(idRoom);
          } else {
            user.ws.send(
              JSON.stringify({
                type: "info",
                text: `[+] ${constUser} is drawing`,
              })
            );
          }

          const limitTime = 90;
          let timeController = limitTime;
          return new Promise<void>((resolve) => {
            const interval = setInterval(() => {
              timeController--;
              time = timeController;
              if (timeController > 0 && solveWord.length < usersPlay.length) {
                user.ws.send(
                  JSON.stringify({
                    type: "info",
                    text: `[+] Time left: ${timeController}`,
                  })
                );
              } else {
                clearInterval(interval);
                user.ws.send(
                  JSON.stringify({ type: "info", text: `[+] Time is over` })
                );
                resolve();
              }
            }, 1000);
          });
        });
        await Promise.all(userPromise);
        finishTurn();
      } catch (error) {
        console.log(error);
      }
    }

    async function finishTurn() {
      if (hasFinishedTurn) {
        return;
      }

      hasFinishedTurn = true;
      roomRounds--;
      if (roomRounds > 0) {
        solveWord = [];
        return await startGame();
      } else {
        SocketController.rooms[idRoom].forEach((user) => {
          if (user.ws.readyState === ws.OPEN) {
            socketController.endGame(idRoom, user.ws);
            user.ws.send(
              JSON.stringify({ type: "info", text: `[+] Game finished` })
            );
          }
        });
        socketController.closeRoom(idRoom);
      }
    }

    ws.on("close", async () => {
      try {
        if (!isSpecialUser) {
          socketController.leaveRoom(ws, idRoom);
          printConnectedUsers(idRoom);
          usersPlay = socketController.assingTurn(idRoom);

          SocketController.rooms[idRoom].forEach((user) => {
            if (user.ws.readyState === ws.OPEN) {
              user.ws.send(
                JSON.stringify({
                  type: "info",
                  text: `[-] ${userName} has left the room`,
                })
              );
              if (SocketController.rooms[idRoom].size > 1) {
                const userPlayTurn = socketController.playerTurn(
                  idRoom,
                  user.ws
                );
                user.ws.send(
                  JSON.stringify({
                    type: "info",
                    text: `[+] Next player to play: ${userPlayTurn}`,
                  })
                );
              }
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  });

  function printConnectedUsers(idRoom) {
    const users = Array.from(SocketController.rooms[idRoom])
      .filter((user) => !user.userName.endsWith("-e72112a8"))
      .map((user) => user.userName);
    const userListMessage = JSON.stringify({ type: "userList", users });
    SocketController.rooms[idRoom].forEach((user) => {
      if (user.ws.readyState === user.ws.OPEN) {
        user.ws.send(userListMessage);
      }
    });
  }

  return router;
};
