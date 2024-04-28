
import { AppDataSource } from "@/data-source";
import { GameRoom } from "@entity/game-room.entity";

export class GameRoomRepository {
  private dataSource = AppDataSource.getRepository(GameRoom);

  async getAllGamesRooms(){
    return this.dataSource.find();
  }

  async updateGameRoom(gameRoom: GameRoom){
    return this.dataSource.update(gameRoom.id, gameRoom);
  }

  async createGameRoom(gameRoom: GameRoom){
    return this.dataSource.save(gameRoom);
  }

  async findGameRoomById(id: string){
    return this.dataSource.findOneBy({ id });
  }

  async deleteGameRoom(id: string){
    return this.dataSource.delete(id);
  }
}