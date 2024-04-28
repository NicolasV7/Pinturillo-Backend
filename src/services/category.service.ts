import { CategoryRepository } from "../repositories/category.repository";

export class CategoryService {
    private categoryRepository: CategoryRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async getAllCategories() {  
        return await this.categoryRepository.getAllCategories();
        
    }
    async findCategoryById(id: number) {
        const categoryData = await this.categoryRepository.findCategoryById(id);
        if (!categoryData) {
            return {
                message: 'Category Id does not exist'
            };
        }

        return this.categoryRepository.findCategoryById(id);
    }

    async getCategoryByName(name: string) {
        const categoryData = await this.categoryRepository.getCategoryByName(name);
        if (!categoryData) {
            return {
                message: 'The name of the category does not exist'
            };
        }

        return this.categoryRepository.getCategoryByName(name);
    }

    async createCategory(category: any) {
        const categoryData = await this.categoryRepository.getCategoryByName(category.name);
        if (categoryData) {
            return {
                message: 'Category already exists'
            };
        }
        return this.categoryRepository.createCategory(category);

    }

    async updateCategory(category: any) {
        const categoryData = await this.categoryRepository.findCategoryById(category.id);
        if (!categoryData) {
            return {
                message: 'Category does not exist'
            };
        }

        return this.categoryRepository.updateCategory(category);
    }

    async deleteCategory(id: number) {
        return this.categoryRepository.deleteCategory(id);
    }
}