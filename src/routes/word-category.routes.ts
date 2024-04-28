import express = require("express");
import { WordCategoryController } from "../controllers/word-category.controller";

export const WordCategoryRouter = express.Router();

const wordCategoryController = new WordCategoryController();

WordCategoryRouter.get('/getAll', wordCategoryController.getAllWordsCategories);
WordCategoryRouter.get('/getById/:id', wordCategoryController.findWordCategoryById);
WordCategoryRouter.post('/create', wordCategoryController.createWordCategory);
WordCategoryRouter.put('/update', wordCategoryController.updateWordCategory);
WordCategoryRouter.delete('/delete/:id', wordCategoryController.deleteWordCategory);