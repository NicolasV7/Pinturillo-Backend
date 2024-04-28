import express = require("express");
import { WordController } from "../controllers/word.controller";

export const WordRouter = express.Router();

const wordController = new WordController();

WordRouter.get('/getAll', wordController.getAllWords);
WordRouter.get('/getById/:id', wordController.findWordById);
WordRouter.get('/getByName/:text', wordController.getWordByName);
WordRouter.post('/create', wordController.createWord);
WordRouter.put('/update', wordController.updateWord);
WordRouter.delete('/delete/:id', wordController.deleteWord);


