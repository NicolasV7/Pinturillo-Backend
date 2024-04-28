import * as express from "express";
import { CategoryController } from "@controller/category.controller";

export const CategoryRouter = express.Router();

const categoryController = new CategoryController();

CategoryRouter.get('/getAll', categoryController.getAll);
CategoryRouter.get('/getById/:id', categoryController.getById);
CategoryRouter.get('/getByName/:name', categoryController.getByName);
CategoryRouter.post('/create', categoryController.create);
CategoryRouter.delete('/delete/:id', categoryController.delete);
CategoryRouter.put('/update', categoryController.update);