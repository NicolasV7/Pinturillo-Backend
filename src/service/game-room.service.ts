import { messages } from "../assets/messages";
import { GameRoom } from "../entity/game-room.entity";
import { GameRoomRepository } from "../repository/game-room.repository";
import { CategoryRepository } from "../repository/category.repository";
import { stat } from "fs";

export class GameRoomService {
    private gameRoomRepository = new GameRoomRepository();
    private categoryRepository = new CategoryRepository();

    constructor() {
        this.gameRoomRepository = new GameRoomRepository();
        this.categoryRepository = new CategoryRepository();
    }

    async getAllGamesRooms() {
        return await this.gameRoomRepository.getAllGamesRooms();
    }

    async findGameRoomById(id: string) {
        const gameRoom = await this.gameRoomRepository.findGameRoomById(id);
        if (!gameRoom) {
            return {
                status: 404,
                message: messages.gameRoom.notFound,
            };
        }
        const gameRoomData = await this.gameRoomRepository.findGameRoomById(id);

        return {
            status: 200,
            message: gameRoomData,
        };
    }

    async createGameRoom(gameRoom: GameRoom) {
        const category = await this.categoryRepository.findById(gameRoom.id_category.id);
        if (!category) {
            return {
                status: 404,
                message: messages.category.notFound,
            };
        }

        await this.gameRoomRepository.createGameRoom(gameRoom);
        return {
            status: 201,
            message: messages.gameRoom.created,
        };
    }

    async updateGameRoom(id: string, gameRoom: GameRoom) {
        const gameRoomData = await this.gameRoomRepository.findGameRoomById(id);
        if (!gameRoomData) {
            return {
                status: 404,
                message: messages.gameRoom.notFoundById,
            };
        }

        await this.gameRoomRepository.updateGameRoom(id, gameRoom);

        return {
            status: 200,
            message: messages.gameRoom.updated,
        };
            
    }

    async deleteGameRoom(id: string) {
        await this.gameRoomRepository.deleteGameRoom(id);

        return {
            status: 200,
            message: messages.gameRoom.deleted,
        };
    }

}
