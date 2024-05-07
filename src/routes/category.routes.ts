import * as express from "express";
import { CategoryController } from "../controller/category.controller";

export const CategoryRouter = express.Router();

const categoryController = new CategoryController();

CategoryRouter.get('/category/getAll', categoryController.getAllCategory);
CategoryRouter.get('/category/getById/:id', categoryController.getCategoryById);
CategoryRouter.get('/category/getByName/:name', categoryController.getCategoryByName);
CategoryRouter.post('/category/create', categoryController.createCategory);
CategoryRouter.delete('/category/delete/:id', categoryController.deleteCategory);
CategoryRouter.put('/category/update/:id', categoryController.updateCategory);