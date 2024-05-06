import * as express from "express";
import { WordController } from "../controller/word.controller";

export const WordRouter = express.Router();

const wordController = new WordController();

WordRouter.get("/getAll", wordController.getAllWords);
WordRouter.get("/getById/:id", wordController.getWordById);
WordRouter.post("/create", wordController.createWord);
WordRouter.put("/update/:id", wordController.updateWord);
WordRouter.delete("/delete/:id", wordController.deleteWord);


