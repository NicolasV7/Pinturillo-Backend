import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { messages } from "../assets/messages";
import { Category } from "../entity/category.entity";
import { CategoryDTO } from "../dto/category.dto";
import { CategoryService } from "../service/category.service";
import { validateCategory } from "../schemas/category.schema";

export class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  public getCategoryByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    try {
      const category = await this.categoryService.findByName(name);
      return res.status(200).send(category);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  public getCategoryById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const category = await this.categoryService.findById(id);
      return res.status(200).send(category);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  public getAllCategory = async (_: Request, res: Response) => {
    try {
      const categories = await this.categoryService.getAll();
      return res.status(200).send(categories);
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
      await this.categoryService.create(category);
      return res.status(201).send(messages.category.created);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };

  public deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await this.categoryService.delete(id);
      return res.status(200).send(messages.category.deleted);
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
      await this.categoryService.update(id, category);
      return res.status(200).send(messages.category.updated);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };
}
