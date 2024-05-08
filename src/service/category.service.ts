import { stat } from 'fs';
import { messages } from '../assets/messages';
import { Category } from '../entity/category.entity';
import { CategoryRepository } from '../repository/category.repository';

export class CategoryService {
  private categoryRepository = new CategoryRepository();
  
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }
  
  async getAllCategories() {
    return await this.categoryRepository.getAll();
  }

  async findCategoryByName(name: string) {
    const category = await this.categoryRepository.findByName(name);
    if (!category) {
      return {
        status: 404,
        message: messages.category.notFound,
      };
    }

    const categoryData = await this.categoryRepository.findByName(name);
    return {
      status: 200,
      message: categoryData,
    };
  }

  async findCategoryById(id: string) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      return {
        status: 404,
        message: messages.category.notFoundById,
      };
    }

    const categoryData = await this.categoryRepository.findById(id);
    return {
      status: 200,
      message: categoryData,
    };
  }


  async createCategory(category: Category) {
    const categoryCreate = await this.categoryRepository.findByName(category.name);
    if (categoryCreate) {
      return {
        status : 409,
        message: messages.category.alreadyExists,
      };
    }

    await this.categoryRepository.create(category);

    return {
      status: 201,
      message: messages.category.created,
    };
  }

  
  async updateCategory(id: string, category: Category) {
    const categoryData = await this.categoryRepository.findById(id);
    if
    (!categoryData) {
      return {
        status: 404,
        message: messages.category.notFoundById,
      };
    }
    await this.categoryRepository.update(id, category);
    return {
      status: 200,
      message: messages.category.updated,
    };
  }

  async deleteCategory(id: string) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      return {
        status: 404,
        message: messages.category.notFoundById,
      };
    }

    await this.categoryRepository.delete(id);
    return {
      status: 200,
      message: messages.category.deleted,
    };
  }
}