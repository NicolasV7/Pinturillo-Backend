import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { Category } from "../entity/category.entity";
import { CategoryDTO } from "../dto/category.dto";
import { CategoryService } from "../service/category.service";
import { validateCategory } from "../schemas/category.schema";

export class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  public getAllCategory = async (_: Request, res: Response) => {
    try {
      const categories = await this.categoryService.getAllCategories();
      return res.status(200).send(categories);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  public getCategoryByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    try {
      const category = await this.categoryService.findCategoryByName(name);
      return res.status(category.status).send(category.message);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  public getCategoryById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const category = await this.categoryService.findCategoryById(id);
      return res.status(category.status).send(category.message);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  public createCategory = async (req: Request, res: Response) => {
    const categoryDTO: CategoryDTO = req.body;
    const { error } = validateCategory(categoryDTO);
    if (error) return res.status(400).send(error.details[0].message);

    const category = new Category();
    category.id = uuidv4();
    category.name = categoryDTO.name as string;

    try {
      const createdCategory = await this.categoryService.createCategory(category);
      return res.status(createdCategory.status).send(createdCategory.message);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  public updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const categoryDTO: CategoryDTO = req.body;
    const { error } = validateCategory(categoryDTO);
    if (error) return res.status(400).send(error.details[0].message);

    const category = new Category();
    category.id = id;
    category.name = categoryDTO.name as string;

    try {
      const updatedCategory = await this.categoryService.updateCategory(id, category);
      return res.status(updatedCategory.status).send(updatedCategory.message);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  public deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deletedCategory = await this.categoryService.deleteCategory(id);
      return res.status(deletedCategory.status).send(deletedCategory.message);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };
}
