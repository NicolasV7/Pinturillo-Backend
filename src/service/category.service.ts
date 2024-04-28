import { messages } from '@assets/messages';
import { Category } from '@entity/category.entity';
import { CategoryRepository } from '@repository/category.repository';

export class CategoryService {
  private categoryRepository = new CategoryRepository();

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async findByName(name: string) {
    const category = await this.categoryRepository.findByName(name);
    if (!category) {
      return {
        message: messages.category.notFound,
      };
    }
    return this.categoryRepository.findByName(name);
  }

  async findById(id: string) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      return {
        message: messages.category.notFoundById,
      };
    }
    return this.categoryRepository.findById(id);
  }

  async getAll() {
    return this.categoryRepository.getAll();
  }

  async create(category: Category) {
    const categoryCreate = await this.categoryRepository.findByName(category.name);
    if (categoryCreate) {
      return {
        message: messages.category.alreadyExists,
      };
    }
    return this.categoryRepository.create(category);
  }

  async delete(id: string) {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      return {
        message: messages.category.notFoundById,
      };
    }
    return this.categoryRepository.delete(id);
  }

  async update(category: Category) {
    const categoryUpdate = await this.categoryRepository.findById(category.id);
    if (!categoryUpdate) {
      return {
        message: messages.category.notFound,
      };
    }
    return this.categoryRepository.update(category);
  }
}