import { UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { GameRoom } from "../entity/game-room.entity";

export class GameRoomRepository {
    private repository = AppDataSource.getRepository(GameRoom);

    async getAllGameRooms(): Promise<GameRoom[]> {
        return this.repository.find();
    }

    async updateGameRoom(gameRoom: GameRoom): Promise<UpdateResult> {
        return this.repository.update(gameRoom.id, gameRoom);
    }

    async createGameRoom(gameRoom: GameRoom): Promise<GameRoom> {
        return this.repository.save(gameRoom);
    }

    async findGameRoomById(id: number): Promise<GameRoom> {
        return this.repository.findOneBy({ id })
    }

    async deleteGameRoom(id: number): Promise<void> {
        await this.repository.delete(id);
    }

}