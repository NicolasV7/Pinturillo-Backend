
import { AppDataSource } from "../data-source";
import { GameRoom } from "../entity/game-room.entity";
import { CategoryRepository } from "./category.repository";

export class GameRoomRepository {
  private dataSource = AppDataSource.getRepository(GameRoom);
  private categoryDataSource = new CategoryRepository();
  private validState = ["Sin iniciar", "En curso", "Finalizado"];

  async getAllGamesRooms(state?: string){
    return this.dataSource.find({ where:  state? {state} : {} });
  }

  async updateGameRoom(id: string, gameRoom: GameRoom){
    return this.dataSource.update(id, gameRoom);
  }

  async findGameRoomByIdCategory(id_category: string){
    return this.dataSource.find({ where:  {id_category}  });
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

  async findGameRoomByNameAndIdCategory(room_name: string, id_category: string){
    return this.dataSource.findOne({ where: { room_name, id_category } });
  }

}