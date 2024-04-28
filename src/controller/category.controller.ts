import { Request, Response } from "express";
import { Category } from "@entity/category.entity";
import { CategoryRepository } from "@repository/category.repository";
import { CategoryDTO } from "@dto/category.dto";
import { validateCategory } from "@schemas/category.schema";

import { messages } from "@assets/messages";

import { v4 as uuidv4 } from "uuid";

export class CategoryController {
  private categoryRepository = new CategoryRepository();

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  public getByName = async (req: Request, res: Response) => {
    try {
      const name = req.params.name;
      const category = await this.categoryRepository.findByName(name);
      res.status(200).json({ category });
    } catch (error) {
      res.status(500).json({ error: error.message });
      1;
    }
  };

  public getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const category = await this.categoryRepository.findById(id);
      res.status(200).json({ category });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  public getAll = async (req: Request, res: Response) => {
    try {
      const categories = await this.categoryRepository.getAll();
      res.status(200).json({ categories });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const categoryDTO: CategoryDTO = req.body;
      const { error } = validateCategory(categoryDTO);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      const category = new Category();
      category.id = uuidv4();
      category.name = categoryDTO.name as string;

      await this.categoryRepository.create(category);
      res.status(201).json({ category });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const category = await this.categoryRepository.findById(id);
      if (!category) {
        return res.status(404).json({ error: messages.category.notFound });
      }

      await this.categoryRepository.delete(category);
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
