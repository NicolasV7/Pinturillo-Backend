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

    async getAllGamesRooms( state?: string) {
        return await this.gameRoomRepository.getAllGamesRooms(state);
    }

    async findGameRoomByIdCategory(id_category: string) {
        const category = await this.categoryRepository.findById(id_category);
        if (!category) {
            return {
                status: 404,
                message: messages.category.notFound,
            };
        }

        const gameRooms = await this.gameRoomRepository.findGameRoomByIdCategory(id_category);

        if (!gameRooms) {
            return {
                status: 404,
                message: messages.gameRoom.notFound,
            };
        }

        const gameRoomsData = await this.gameRoomRepository.findGameRoomByIdCategory(id_category);

        return {
            status: 200,
            message: gameRoomsData,
        };
    }

    async findGameRoomById(id: string) {
        const gameRoom = await this.gameRoomRepository.findGameRoomById(id);
        if (!gameRoom) {
            return {
                status: 404,
                message: messages.gameRoom.notFoundById,
            };
        }
        const gameRoomData = await this.gameRoomRepository.findGameRoomById(id);

        return {
            status: 200,
            message: gameRoomData,
        };
    }

    async createGameRoom(gameRoom: GameRoom) {
        const categoryString = JSON.stringify(gameRoom.id_category);
        const category_id = categoryString.replace(/"/g, '');

        const category = await this.categoryRepository.findById(category_id);

        console.log(category_id)
        if (!category) {
            return {
                status: 404,
                message: messages.category.notFound,
            };
        }

        const existingNameCategory = await this.gameRoomRepository.findGameRoomByNameAndIdCategory(gameRoom.room_name, category_id);

        if (existingNameCategory) {
            return {
                status: 409,
                message: messages.gameRoom.alreadyExists,
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
