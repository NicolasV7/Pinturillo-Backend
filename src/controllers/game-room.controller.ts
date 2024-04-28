import { GameRoomService } from "../services/game-room.service";

export class GameRoomController {
    private gameRoomService: GameRoomService;

    constructor() {
        this.gameRoomService = new GameRoomService();
    }

    public getAllGameRooms = async (req: any, res: any) => {
        try {
            const gameRooms = await this.gameRoomService.getAllGameRooms();
            return res.status(200).send(gameRooms);
        } catch (error) {
            return res.status(500).send(error.message);
        }    
        
    }

    public findGameRoomById = async (req: any, res: any) => {
        const id = req.params;
        try {
            const gameRoom = await this.gameRoomService.findGameRoomById(id);
            return res.status(200).send(gameRoom);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    public createGameRoom = async (req: any, res: any) => {
        const gameRoom = req.body;
        try {
            await this.gameRoomService.createGameRoom(gameRoom);
            return res.status(201).send({message: 'Game Room created successfully'});
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    public updateGameRoom = async (req: any, res: any) => {
        const gameRoom = req.body;
        try {
            await this.gameRoomService.updateGameRoom(gameRoom);
            return res.status(200).send({message: 'Game Room updated successfully'});
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    public deleteGameRoom = async (req: any, res: any) => {
        const id = req.params;

        try {
            await this.gameRoomService.deleteGameRoom(id);
            return res.status(200).send({message: 'Game Room deleted successfully'});
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
    
}