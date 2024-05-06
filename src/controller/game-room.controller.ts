import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { messages } from "../assets/messages";
import { GameRoomService } from "../service/game-room.service";
import { validateGameRoom } from "../schemas/game-room.schema";

export class GameRoomController {
  private gameRoomservice = new GameRoomService();

  constructor() {
    this.gameRoomservice = new GameRoomService();
  }

  public getAllGameRooms = async (_: Request, res: Response) => {
    try {
      const gameRooms = await this.gameRoomservice.getAllGamesRooms();
      return res.status(200).send(gameRooms);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  public findGameRoomById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const gameRoom = await this.gameRoomservice.findGameRoomById(id);
      return res.status(200).send(gameRoom);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  public createGameRoom = async (req: Request, res: Response) => {
    const gameRoom = req.body;
    const { error } = validateGameRoom(gameRoom);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    gameRoom.id = uuidv4();
    try {
      await this.gameRoomservice.createGameRoom(gameRoom);
      return res.status(201).send(messages.gameRoom.created);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  public updateGameRoom = async (req: Request, res: Response) => {
    const { id } = req.params;
    const gameRoom = req.body;
    const { error } = validateGameRoom(gameRoom);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    try {
      await this.gameRoomservice.updateGameRoom(id, gameRoom);
      return res.status(200).send(messages.gameRoom.updated);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  public deleteGameRoom = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await this.gameRoomservice.deleteGameRoom(id);
      return res.status(200).send(messages.gameRoom.deleted);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };
}
