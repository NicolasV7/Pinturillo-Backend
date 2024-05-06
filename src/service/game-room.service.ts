import { messages } from "../assets/messages";
import { GameRoom } from "../entity/game-room.entity";
import { GameRoomRepository } from "../repository/game-room.repository";
import { CategoryRepository } from "../repository/category.repository";

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
                message: messages.gameRoom.notFound,
            };
        }

        return await this.gameRoomRepository.findGameRoomById(id);
    }

    async createGameRoom(gameRoom: GameRoom) {
        const category = await this.categoryRepository.findById(gameRoom.idCategory.id);
        if (!category) {
            return {
                message: messages.category.notFound,
            };
        }

        return await this.gameRoomRepository.createGameRoom(gameRoom);
    }

    async updateGameRoom(gameRoom: GameRoom) {
        const gameRoomData = await this.gameRoomRepository.findGameRoomById(gameRoom.id);
        if (!gameRoomData) {
            return {
                message: messages.gameRoom.notFound,
            };
        }

        return await this.gameRoomRepository.updateGameRoom(gameRoom);
    }

    async deleteGameRoom(id: string) {
        return await this.gameRoomRepository.deleteGameRoom(id);
    }

}
