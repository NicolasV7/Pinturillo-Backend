import { GameRoomRepository } from "../repositories/game-room.repository";
import { CategoryRepository } from "../repositories/category.repository";

export class GameRoomService {
    private gameRoomRepository: GameRoomRepository;
    private categoryRepository: CategoryRepository;

    constructor() {
        this.gameRoomRepository = new GameRoomRepository();
        this.categoryRepository = new CategoryRepository();
    }

    async getAllGameRooms() {
        return await this.gameRoomRepository.getAllGameRooms();
    }

    async findGameRoomById(id: number) {
        const gameRoomData = await this.gameRoomRepository.findGameRoomById(id);
        if (!gameRoomData) {
            return {
                message: 'Game Room Id does not exist'
            };
        }

        return gameRoomData;
    }

    async createGameRoom(gameRoom: any) {
        const idCategory = await this.categoryRepository.findCategoryById(gameRoom.idCategory);
        if (idCategory) {
            return {
                message: 'Game Room already exists'
            };
        }
        return await this.gameRoomRepository.createGameRoom(gameRoom);

    }

    async updateGameRoom(gameRoom: any) {
        const gameRoomData = await this.gameRoomRepository.findGameRoomById(gameRoom.id);
        if (!gameRoomData) {
            return {
                message: 'Game Room does not exist'
            };
        }

        return await this.gameRoomRepository.updateGameRoom(gameRoom);
    }

    async deleteGameRoom(id: number) {
        return this.gameRoomRepository.deleteGameRoom(id);
    }

}
