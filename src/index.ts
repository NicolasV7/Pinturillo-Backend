import { AppDataSource } from './data-source';
import * as dotenv from 'dotenv';

import 'reflect-metadata';
import { errorHandler } from './middleware/errorHandler'
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerSpec from './swagger';

import { CategoryRouter } from "./routes/category.routes";
import { GameRoomRouter } from "./routes/game-room.routes";
import { WordRouter } from "./routes/word.routes";
import { WordCategoryRouter } from "./routes/word-category.routes";


const cors = require('cors');
dotenv.config();

const logger = require('morgan');

const { PORT = 3000 } = process.env;
var express = require('express');
var app = express();
const wsInstance = require('express-ws')(app);
const ws = require('./routes/socket/socket.routes')(wsInstance);

app.use(logger('dev'));

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use('/api/v1/ws', ws);

app.use('/api/v1', CategoryRouter, GameRoomRouter, WordRouter, WordCategoryRouter);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

AppDataSource.initialize()
  .then(async () => {
    app.listen(3000, () => {
      console.log('[+] http://localhost:' + PORT);
    });
    console.log('[+] Data initialized!');
  })
  .catch((error) => console.log(error));