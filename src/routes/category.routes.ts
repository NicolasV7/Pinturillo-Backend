import express = require("express");
import { CategoryController } from "../controllers/category.controller";

export const CategoryRouter = express.Router();

const categoryController = new CategoryController();

CategoryRouter.get('/getAll', categoryController.getAllCategories);
CategoryRouter.get('/getById/:id', categoryController.findCategoryById);
CategoryRouter.post('/create', categoryController.createCategory);
CategoryRouter.put('/update', categoryController.updateCategory);
CategoryRouter.delete('/delete/:id', categoryController.deleteCategory);