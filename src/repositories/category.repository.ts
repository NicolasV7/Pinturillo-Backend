import { Category } from "../entity/category.entity";
import { AppDataSource } from "../data-source";

export class CategoryRepository {
  private dataSource = AppDataSource.getRepository(Category);

  async findByName(name: string) {
    return this.dataSource.findOneBy({ name });
  }

  async findById(id: string) {
    return this.dataSource.findOneBy({ id });
  }

  async getAll() {
    return this.dataSource.find();
  }

  async create(category: Category) {
    return this.dataSource.save(category);
  }

  async delete(category: Category) {
    return this.dataSource.remove(category);
  }
}