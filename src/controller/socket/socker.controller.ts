import { GameRoomRepository } from "../../repository/game-room.repository";
import { WordCategoryRepository } from "../../repository/word-category.repository";
import { messages } from "../../assets/messages";
const WebSocket = require("ws");

export class SocketController {
  public static rooms = {};
  public userTurn = [];
  public asignWord = "";

  public gameRoomRepository = new GameRoomRepository();

  async verifyRoom(ws, roomId) {
    try {
      const room = await this.gameRoomRepository.findGameRoomById(roomId);
      if (!room) {
        ws.send(
          JSON.stringify({ type: "error", message: messages.gameRoom.notFound })
        );
        ws.close();
        return;
      }
      room.state = messages.gameRoom.started;
      await this.gameRoomRepository.updateGameRoom(roomId, room);
      return room;
    } catch (err) {
      ws.send(
        JSON.stringify({ type: "error", message: messages.gameRoom.notFound })
      );
      ws.close();
    }
  }

  async closeRoom(roomId) {
    const room = await this.gameRoomRepository.findGameRoomById(roomId);
    room.state = messages.gameRoom.finished;
    await this.gameRoomRepository.updateGameRoom(roomId, room);
  }

  async joinRoom(ws, userName, roomId) {
    if (!SocketController.rooms[roomId]) {
      SocketController.rooms[roomId] = new Set();
    }
    SocketController.rooms[roomId].add({ ws, userName, score: 0 });
  }

  async leaveRoom(ws, roomId) {
    if (SocketController.rooms[roomId]) {
      const userToDelete = Array.from(SocketController.rooms[roomId]).find(
        (user: any) => user.ws === ws
      );
      SocketController.rooms[roomId].delete(userToDelete);
      if (SocketController.rooms[roomId].size === 0) {
        delete SocketController.rooms[roomId];
      }
      this.userTurn = [];
    }
  }

  async guessWord(roomId, word) {
    if (SocketController.rooms[roomId]) {
      if (word.toLowerCase() === this.asignWord.toLowerCase()) {
        return true;
      }
      return false;
    }
  }

  async assingTurn(roomId) {
    if (SocketController.rooms[roomId]) {
      this.userTurn = [];
      const users = Array.from(SocketController.rooms[roomId]);

      for (const user of users) {
        const turn = Math.floor(users.indexOf(user)) + 1;
        this.userTurn.push({ user, turn });
      }
      return this.userTurn;
    }
  }

  async playerTurn(roomId, ws) {
    if (SocketController.rooms[roomId]) {
      for (const user of this.userTurn) {
        if (user.user.ws === ws) {
          return user.turn;
        }
      }
    }
  }

  async asignWordToGuess(roomId) {
    if (SocketController.rooms[roomId]) {
      const gameRoom = new GameRoomRepository();
      const room = await (gameRoom.findGameRoomById(roomId));
      const category = room.id_category.toString();

      const wordCategory = new WordCategoryRepository();
      const words = await wordCategory.findWordCategoryByIdCategory(category);
    }
  }
}
