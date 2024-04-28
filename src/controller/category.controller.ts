import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { messages } from "@assets/messages";
import { Category } from "@entity/category.entity";
import { CategoryDTO } from "@dto/category.dto";
import { CategoryService } from "@service/category.service";
import { validateCategory } from "@schemas/category.schema";

export class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  public getByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    try {
      const category = await this.categoryService.findByName(name);
      return res.status(200).send(category);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const category = await this.categoryService.findById(id);
      return res.status(200).send(category);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  public getAll = async (_: Request, res: Response) => {
    try {
      const categories = await this.categoryService.getAll();
      return res.status(200).send(categories);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  public create = async (req: Request, res: Response) => {
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
  }

  public delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await this.categoryService.delete(id);
      return res.status(200).send(messages.category.deleted);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  public update = async (req: Request, res: Response) => {
    const categoryDTO: CategoryDTO = req.body;
    const { error } = validateCategory(categoryDTO);
    if (error) return res.status(400).send(error.details[0].message);

    const category = new Category();
    category.id = categoryDTO.id as string;
    category.name = categoryDTO.name as string;

    try {
      await this.categoryService.update(category);
      return res.status(200).send(messages.category.updated);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}
