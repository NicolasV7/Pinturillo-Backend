import * as express from "express";
import { GameRoomController } from "../controller/game-room.controller";

export const GameRoomRouter = express.Router();

const gameRoomController = new GameRoomController();

GameRoomRouter.get('/game-room/getAll', gameRoomController.getAllGameRooms);
GameRoomRouter.get('/game-room/getById/:id', gameRoomController.findGameRoomById);
GameRoomRouter.post('/game-room/create', gameRoomController.createGameRoom);
GameRoomRouter.put('/game-room/update/:id', gameRoomController.updateGameRoom);
GameRoomRouter.delete('/game-room/delete/:id', gameRoomController.deleteGameRoom);