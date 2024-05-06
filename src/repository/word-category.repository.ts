
import { AppDataSource } from "../data-source";
import { WordCategory } from "../entity/word-category.entity";

export class WordCategoryRepository {
    private dataSource = AppDataSource.getRepository(WordCategory);

    async getAllWordsCategories(){
        return this.dataSource.find();
    }

    async findWordCategoryById(id: string){
        return this.dataSource.findOneBy({ id });
    }

    async createWordCategory(wordCategory: WordCategory){
        return this.dataSource.save(wordCategory);
    }

    async updateWordCategory(wordCategory: WordCategory){
        return this.dataSource.update(wordCategory.id, wordCategory);
    }

    async deleteWordCategory(id: string){
        return this.dataSource.delete(id);
    }
}