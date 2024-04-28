import "reflect-metadata";
import { DataSource } from "typeorm";

import { Category} from "./entity/category.entity";
import { GameRoom } from "./entity/game-room.entity";
import { WordCategory } from "./entity/word-category.entity";
import { Word } from "./entity/word.entity";

import * as dotenv from "dotenv";

import { Category } from "./entity/category.entity";



dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME} =
  process.env;
  
export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT || "5432"),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false,
//logging logs sql command on the treminal
  logging:  false,
  entities: [Category, GameRoom, WordCategory, Word],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});