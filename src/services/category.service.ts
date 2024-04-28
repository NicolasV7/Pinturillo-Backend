import { Category } from '../entity/category.entity';
import { CategoryRepository } from '../repositories/category.repository';

export class CategoryService {
  private categoryRepository = new CategoryRepository();

  async findByName(name: string) {
    return this.categoryRepository.findByName(name);
  }

  async findById(id: string) {
    return this.categoryRepository.findById(id);
  }

  async getAll() {
    return this.categoryRepository.getAll();
  }

  async create(category: Category) {
    return this.categoryRepository.create(category);
  }

  async delete(category: Category) {
    return this.categoryRepository.delete(category);
  }
}