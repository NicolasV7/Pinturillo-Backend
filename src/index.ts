import { AppDataSource } from './data-source';
import * as dotenv from 'dotenv';

import 'reflect-metadata';
import { errorHandler } from './middleware/errorHandler'
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerSpec from './swagger'

import { CategoryRouter } from "./routes/category.routes";
import { GameRoomRouter } from "./routes/game-room.routes";
import { WordRouter } from "./routes/word.routes";
import { WordCategoryRouter } from "./routes/word-category.routes";

const cors = require('cors');
dotenv.config();

const { PORT = 3000 } = process.env;
var express = require('express');
var app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use('/category', CategoryRouter);
app.use('/game-room', GameRoomRouter);
app.use('/word', WordRouter);
app.use('/word-category', WordCategoryRouter);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
AppDataSource.initialize()
  .then(async () => {
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:' + PORT);
    });
    console.log('Data Source has been initialized!');
  })
  .catch((error) => console.log(error));