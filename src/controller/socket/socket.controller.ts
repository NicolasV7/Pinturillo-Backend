import { GameRoomRepository } from "../../repository/game-room.repository";
import { messages } from "../../assets/messages";
import { WordService } from "../../service/word.service";
import { Word } from "../../entity/word.entity";
import { CategoryRepository } from "../../repository/category.repository";
import { User } from "../../dto/user.dto";

export class SocketController {
  public static rooms: { [roomId: string]: Set<User> } = {};
  public userTurn: Array<{ user: User, turn: number }> = [];
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
      SocketController.rooms[roomId] = new Set<User>();
    }
    SocketController.rooms[roomId].add({ ws, userName, score: 0 });
    this.broadcastUserList(roomId);
  }

  leaveRoom(ws, roomId) {
    if (SocketController.rooms[roomId]) {
      const userToDelete = Array.from(SocketController.rooms[roomId]).find(
        (user: User) => user.ws === ws
      );
      SocketController.rooms[roomId].delete(userToDelete);
      if (SocketController.rooms[roomId].size === 0) {
        delete SocketController.rooms[roomId];
      }
      this.userTurn = [];
      this.broadcastUserList(roomId);
    }
  }

  guessWord(roomId, word) {
    if (SocketController.rooms[roomId]) {
      if (word.toLowerCase() === this.asignWord.toLowerCase()) {
        return true;
      }
      return false;
    }
  }

  assingTurn(roomId) {
    if (SocketController.rooms[roomId]) {
      this.userTurn = [];
      const users = Array.from(SocketController.rooms[roomId])
        .filter(user => !user.userName.endsWith("-e72112a8"));
      let turn = 1;
      for (const user of users) {
        this.userTurn.push({ user, turn });
        turn++;
      }
      return this.userTurn;
    }
  }

  playerTurn(roomId, ws) {
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
      const room = await gameRoom.findGameRoomById(roomId);

      const category = JSON.stringify(room.id_category);
      const category_id = category.replace(/"/g, '');

      const wordCategory = new CategoryRepository();
      const words = await wordCategory.findById(category_id);

      const random = Math.floor(Math.random() * words.words.length);
      const randomWord = words.words[random];

      const word = new WordService();
      const selectWord: Word = await word.findWordByIdS(randomWord.id);

      this.asignWord = selectWord.text;
      return this.asignWord;
    }
    return null;
  }

  async score(roomId, scorePosition, ws, time) {
    if (SocketController.rooms[roomId]) {
      for (const user of SocketController.rooms[roomId]) {
        if (user.ws === ws) {
          if (user.userName.endsWith("-e72112a8")) {
            return 0;
          }

          const score = (SocketController.rooms[roomId].size - scorePosition) * 10;
          const maxTime = 90;

          const timeScore = Math.max(0, 1 - ((maxTime - time) / maxTime));
          const finalScore = Math.floor(timeScore * 100);

          const totalScore = score + finalScore;
          user.score = totalScore;

          return totalScore;
        }
      }
    }
  }

  endTurn(roomId) {
    if (SocketController.rooms[roomId]) {
      for (const user of this.userTurn) {
        if (user.turn == 1) {
          user.turn = SocketController.rooms[roomId].size;
        } else {
          user.turn--;
        }
      }
      return this.userTurn;
    }
  }

  endGame(roomId, ws) {
    this.asignWord = "";
    if (SocketController.rooms[roomId]) {
      const users = Array.from(SocketController.rooms[roomId])
        .filter((user: User) => !user.userName.endsWith("-e72112a8"));
      const result = users.map((user: User) => {
        return { userName: user.userName, score: user.score };
      });
      result.sort((a: any, b: any) => b.score - a.score);
      result.forEach((result: any, index: number) => {
        const podiumMessage = `Puesto ${index + 1}: ${result.userName} con ${result.score} puntos`;
        ws.send(JSON.stringify({ type: 'info', text: podiumMessage }));
      });
    }
  }

  broadcastDrawing(roomId, data) {
    if (SocketController.rooms[roomId]) {
      SocketController.rooms[roomId].forEach((user: User) => {
        if (user.ws.readyState === user.ws.OPEN) {
          user.ws.send(JSON.stringify({ type: 'drawing', data }));
        }
      });
    }
  }

  broadcastUserList(roomId) {
    if (SocketController.rooms[roomId]) {
      const users = Array.from(SocketController.rooms[roomId])
        .map((user: User) => user.userName)
        .filter(userName => !userName.endsWith("-e72112a8"));
      SocketController.rooms[roomId].forEach((user: User) => {
        if (user.ws.readyState === user.ws.OPEN) {
          user.ws.send(JSON.stringify({ type: 'userList', users }));
        }
      });
    }
  }
}
