import { AppDataSource } from "../data-source";
import { Category } from "../entity/category.entity";
import { UpdateResult } from "typeorm";

export class CategoryRepository{
    private repository = AppDataSource.getRepository(Category);

    async getAllCategories(): Promise<Category[]> {
        return this.repository.find();
    }

    async findCategoryById(id: number): Promise<Category> {
        return this.repository.findOneBy({ id })
    }
    
    async getCategoryByName(name: string): Promise<Category> {
        return this.repository.findOneBy({ name });
    }

    async createCategory(category: Category): Promise<Category> {
        return this.repository.save(category);
    }

    async updateCategory(category: Category): Promise<UpdateResult> {
        return this.repository.update(category.id, category);
    }

    async deleteCategory(id: number): Promise<void> {
        await this.repository.delete(id);
    }

}