
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

    async updateWordCategory(id: string, wordCategory: WordCategory){
        return this.dataSource.update(id, wordCategory);
    }

    async deleteWordCategory(id: string){
        return this.dataSource.delete(id);
    }

    async findWordCategoryByWordIdAndCategoryId(id_word: string, id_category: string){
        return this.dataSource.findOneBy({ id_word, id_category });
    }

    async findWordCategoryByIdWord(id_word: string){
        return this.dataSource.findOneBy({ id_word });
    }

    async findWordCategoryByIdCategory(id_category: string){
        return this.dataSource.findOneBy({ id_category });
    }
}