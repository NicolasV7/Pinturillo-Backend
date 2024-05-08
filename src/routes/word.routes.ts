import * as express from "express";
import { WordController } from "../controller/word.controller";

export const WordRouter = express.Router();

const wordController = new WordController();

WordRouter.get("/word/getAll", wordController.getAllWords);
WordRouter.get("/word/getByText/:text", wordController.getWordByText);
WordRouter.get("/word/getById/:id", wordController.getWordById);
WordRouter.post("/word/create", wordController.createWord);
WordRouter.put("/word/update/:id", wordController.updateWord);
WordRouter.delete("/word/delete/:id", wordController.deleteWord);


