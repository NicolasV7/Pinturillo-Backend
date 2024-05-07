import { GameRoomRepository } from "../repository/game-room.repository";
import { WordCategoryRepository } from "../repository/word-category.repository";
import { WordService } from "../service/word.service";
import { Word } from "../entity/word.entity";
const WebSocket = require('ws');

export class SocketController{
    public static  rooms = {};
    public clientWithTurn = [];
    public palabraAsignada = "";
    public gameRoomRepository = new GameRoomRepository();

    async verifyRoom(idSalaDeJuego, ws){
      try{
      const sala= await this.gameRoomRepository.findGameRoomById(idSalaDeJuego)
        if (sala === null){
        ws.send("Sala de juego no encontrada");
        ws.close();
        return false;
        }
        sala.state = "En curso";
        return true;
      }catch(error){
        ws.send("Número de sala de juego no válido");
        ws.close();
        return false;
      }
    }

    async closeRoom(idSalaDeJuego, ws){
        const sala = await this.gameRoomRepository.findGameRoomById(idSalaDeJuego);
        sala.state = "Finalizado";
        ws.send("Sala de juego finalizada");
        ws.close();
        this.leaveRoom(ws, idSalaDeJuego);
    }
    async joinRoom(ws, username, idSalaDeJuego) {
      if (!SocketController.rooms[idSalaDeJuego]) {
        SocketController.rooms[idSalaDeJuego] = new Set();
      }
      SocketController.rooms[idSalaDeJuego].add({ws, username, puntos: 0, turno: 0});
      }
      
      leaveRoom(ws, idSalaDeJuego) {
        if (SocketController.rooms[idSalaDeJuego]) {
          const clientToDelete = Array.from(SocketController.rooms[idSalaDeJuego]).find((client: any) => client.ws === ws);
          SocketController.rooms[idSalaDeJuego].delete(clientToDelete);
          if (SocketController.rooms[idSalaDeJuego].size === 0) {
            delete SocketController.rooms[idSalaDeJuego];
          }
          this.clientWithTurn = [];
        }
      }
      
      guessWord(idSalaDeJuego, message) {
        if (SocketController.rooms[idSalaDeJuego]) {
            if(message === this.palabraAsignada){
              return true;
            }
            return false;
        }
      }
  
      assignATurn(idSalaDeJuego) {
        if (SocketController.rooms[idSalaDeJuego]) {
          const clients = Array.from(SocketController.rooms[idSalaDeJuego]);
          for (const client of clients) {
            const turno = Math.floor(clients.indexOf(client))+1;
            this.clientWithTurn.push({client, turno});
          }
          return this.clientWithTurn;
        }
      }
      
        playerTurn(idSalaDeJuego, ws) {
        if (SocketController.rooms[idSalaDeJuego]) {
        for (const client of this.clientWithTurn) {
            if (client.client.ws === ws) {
              return client.turno;
            }
          }
        }
      }
      async asignWord(idSalaDeJuego) {
        if (SocketController.rooms[idSalaDeJuego]) {
          const gameRoom = new GameRoomRepository();
          const sala = await (gameRoom.findGameRoomById(idSalaDeJuego));
          const categoria = sala.id;
          
          const wordCategory = new WordCategoryRepository();
          const palabras = await wordCategory.findWordCategoryById(categoria);
          const randomIndex = Math.floor(Math.random() * palabras.words.length);
          const randomWord = palabras.words[randomIndex];
          
          
          const word = new WordService();
          const palabraSeleccionada = await word.findWordById(randomWord.id) as Word;
          this.palabraAsignada = palabraSeleccionada.text;
        }
        return null;
      }

      async points(idSalaDeJuego, puesto, ws, tiempo) {
        if (SocketController.rooms[idSalaDeJuego]) {
          console.log(tiempo)
          for (const client of SocketController.rooms[idSalaDeJuego]) {
            if (client.ws === ws) {
              const scoreFrontPosition = (SocketController.rooms[idSalaDeJuego].size - puesto) * 10;
              const maxTime = 90;
              const timeScoreFactor = Math.max(0, 1 - ((maxTime-tiempo) / maxTime));
              const scoreFrontTime = Math.floor(timeScoreFactor*100);
              const totalScore = scoreFrontPosition + scoreFrontTime;
              client.puntos += totalScore;
              return totalScore;
            }
        }
      }
    }
    
      endTurn(idSalaDeJuego) {
        if (SocketController.rooms[idSalaDeJuego]) {
          for (const client of this.clientWithTurn) {
            if(client.turno == 1){
              client.turno = SocketController.rooms[idSalaDeJuego].size;
            }else{
              client.turno--;
            }
          }
          console.log(this.clientWithTurn);
          return this.clientWithTurn;
        }
      }
      endGame(roomName){
        if (SocketController.rooms[roomName]){
          const clients = Array.from(SocketController.rooms[roomName]);
          const results = clients.map((client: any)=>{
            return {
              name: client.username,
              score: client.puntos
            };
          });
          results.sort((a: any,b: any)=> b.score-a.score);
          console.log("results");
          results.forEach((result: any, index: number)=>{
            console.log(`${index + 1}. ${result.name}: ${result.score}`);
          });
        }
      }
}