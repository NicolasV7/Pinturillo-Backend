import { UpdateResult } from "typeorm";
import { AppDataSource } from "@/data-source";
import { WordCategory } from "../entity/word-category.entity";

export class WordCategoryRepository {
    private repository = AppDataSource.getRepository(WordCategory);

    async getAllWordsCategories(): Promise<WordCategory[]> {
        return this.repository.find();
    }

    async findWordCategoryById(id: number): Promise<WordCategory> {
        return this.repository.findOneBy({ id })
    }

    async createWordCategory(wordCategory: WordCategory): Promise<WordCategory> {
        return this.repository.save(wordCategory);
    }

    async updateWordCategory(wordCategory: WordCategory): Promise<UpdateResult> {
        return this.repository.update(wordCategory.id, wordCategory);
    }

    async deleteWordCategory(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}