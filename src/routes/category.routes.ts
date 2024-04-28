import * as express from 'express';

import { CategoryController } from '@controller/category.controller';

const router = express.Router();
const categoryController = new CategoryController();

router.get('/category/:name', categoryController.getByName);
router.get('/category/:id', categoryController.getById);
router.get('/category', categoryController.getAll);
router.post('/category', categoryController.create);
router.delete('/category', categoryController.delete);

export { router as categoryRoutes}