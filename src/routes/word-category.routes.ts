import * as express from "express";
import { WordCategoryController } from "../controller/word-category.controller";

export const WordCategoryRouter = express.Router();

const wordCategoryController = new WordCategoryController();

WordCategoryRouter.get("/word-category/getAll", wordCategoryController.getAllWordsCategories);
WordCategoryRouter.get("/word-category/getById/:id", wordCategoryController.getWordCategoryById);
WordCategoryRouter.post("/word-category/create", wordCategoryController.createWordCategory);
WordCategoryRouter.put("/word-category/update/:id", wordCategoryController.updateWordCategory);
WordCategoryRouter.delete("/word-category/delete/:id", wordCategoryController.deleteWordCategory);