import * as express from "express";
import { WordCategoryController } from "../controller/word-category.controller";

export const WordCategoryRouter = express.Router();

const wordCategoryController = new WordCategoryController();

WordCategoryRouter.get("/getAll", wordCategoryController.getAllWordsCategories);
WordCategoryRouter.get("/getById/:id", wordCategoryController.getWordCategoryById);
WordCategoryRouter.post("/create", wordCategoryController.createWordCategory);
WordCategoryRouter.put("/update", wordCategoryController.updateWordCategory);
WordCategoryRouter.delete("/delete/:id", wordCategoryController.deleteWordCategory);