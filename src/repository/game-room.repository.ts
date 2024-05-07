
import { AppDataSource } from "../data-source";
import { GameRoom } from "../entity/game-room.entity";
import { CategoryRepository } from "./category.repository";

export class GameRoomRepository {
  private dataSource = AppDataSource.getRepository(GameRoom);
  private categoryDataSource = new CategoryRepository();

  async getAllGamesRooms(){
    return this.dataSource.find();
  }

  async updateGameRoom(id: string, gameRoom: GameRoom){
    return this.dataSource.update(id, gameRoom);
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
    const categoryId = await this.categoryDataSource.findById(id_category);
    return this.dataSource.findOneBy({ room_name, id_category: categoryId });
  }

}