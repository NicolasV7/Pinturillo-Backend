import * as express from "express";
import { GameRoomController } from "../controller/game-room.controller";

export const GameRoomRouter = express.Router();

const gameRoomController = new GameRoomController();

GameRoomRouter.get('/getAll', gameRoomController.getAllGameRooms);
GameRoomRouter.get('/getById/:id', gameRoomController.findGameRoomById);
GameRoomRouter.post('/create', gameRoomController.createGameRoom);
GameRoomRouter.put('/update', gameRoomController.updateGameRoom);
GameRoomRouter.delete('/delete/:id', gameRoomController.deleteGameRoom);