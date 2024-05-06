import * as express from "express";
import { CategoryController } from "../controller/category.controller";

export const CategoryRouter = express.Router();

const categoryController = new CategoryController();

CategoryRouter.get('/getAll', categoryController.getAllCategory);
CategoryRouter.get('/getById/:id', categoryController.getCategoryById);
CategoryRouter.get('/getByName/:name', categoryController.getCategoryByName);
CategoryRouter.post('/create', categoryController.createCategory);
CategoryRouter.delete('/delete/:id', categoryController.deleteCategory);
CategoryRouter.put('/update', categoryController.updateCategory);