import { GameRoomRepository } from "../../repository/game-room.repository";
import { WordCategoryRepository } from "../../repository/word-category.repository";
import { messages } from "../../assets/messages";
import { WordService } from "../../service/word.service";
import { Word } from "../../entity/word.entity";

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
      const room = await gameRoom.findGameRoomById(roomId);
      const category = room.id_category.toString();

      const wordCategory = new WordCategoryRepository();
      const words = await wordCategory.findWordCategoryByIdCategory(category);

      const random = Math.floor(Math.random() * words.categories.length);
      const randomWord = words.categories[random];

      const word = new WordService();
      const wordToGuess = await word.findWordById(randomWord.id);

      if(typeof wordToGuess === 'string'){
        this.asignWord = wordToGuess;
      }else if (wordToGuess instanceof Word){
        this.asignWord = wordToGuess.text;
      }else{
        throw new Error(messages.word.notFound);
      }
    }
    return;
  }

  async score(roomId, scorePosition, ws, time){
    if (SocketController.rooms[roomId]) {
      for(const user of SocketController.rooms[roomId]){
        if(user.ws === ws){
          const score = (SocketController.rooms[roomId].size - scorePosition) * 10;
          const maxTime = 90;

          const timeScore = Math.max(0, 1 - ((maxTime - time) / maxTime));
          const finalScore = Math.floor(timeScore*100);

          const totalScore = score + finalScore;
          user.score = totalScore;

          return totalScore;
        }
      }
    }
  }

  async endTurn(roomId){
    if (SocketController.rooms[roomId]) {
      for(const user of this.userTurn){
        if(user.turn == 1){
          user.turn
        }else{
          user.turn -= 1;
        }
      }
      return this.userTurn;
    }
  }

  async endGame(roomId, ws){
    this.asignWord = "";
    if(SocketController.rooms[roomId]){
      const users = Array.from(SocketController.rooms[roomId]);
      const result = users.map((user: any) => {
        return { userName: user.userName, score: user.score };
      });
      result.sort((a: any, b: any) => b.score - a.score);
      result.forEach((result: any, index: number) => {
        ws.send(`Puesto ${index + 1}: ${result.userName} con ${result.score} puntos`);
      });
    }
  }
}
