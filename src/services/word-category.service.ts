import { CategoryRepository } from "../repositories/category.repository";
import { WordCategoryRepository } from "../repositories/word-category.repository";
import { WordRepository } from "../repositories/word.repository";

export class WordCategoryService {
    private wordCategoryRepository: WordCategoryRepository;
    private wordRepository: WordRepository;
    private categoryRepository: CategoryRepository;

    constructor() {
        this.wordCategoryRepository = new WordCategoryRepository();
        this.wordRepository = new WordRepository();
        this.categoryRepository = new CategoryRepository();
    }

    async getAllWordsCategories() {
        return await this.wordCategoryRepository.getAllWordsCategories();
    }

    async findWordCategoryById(id: number) {
        const wordCategoryData = await this.wordCategoryRepository.findWordCategoryById(id);
        if (!wordCategoryData) {
            return {
                message: 'Word Category Id does not exist'
            };
        }

        return wordCategoryData;
    }

    async createWordCategory(wordCategory: any) {
        const idWord = await this.wordRepository.findWordById(wordCategory.idWord);
        const idCategory = await this.categoryRepository.findCategoryById(wordCategory.idCategory);
        if (!idWord) {
            return {
                message: 'Word Id does not exist'
            };
        }

        if (!idCategory) {
            return {
                message: 'Category Id does not exist'
            };
        }

        return await this.wordCategoryRepository.createWordCategory(wordCategory);
    }

    async updateWordCategory(wordCategory: any) {
        const wordCategoryData = await this.wordCategoryRepository.findWordCategoryById(wordCategory.id);
        const idWord = await this.wordRepository.findWordById(wordCategory.idWord);
        const idCategory = await this.categoryRepository.findCategoryById(wordCategory.idCategory);

        if (!wordCategoryData) {
            return {
                message: 'Word Category does not exist'
            };
        }

        if (!idWord) {
            return {
                message: 'Word Id does not exist'
            };
        }

        if (!idCategory) {
            return {
                message: 'Category Id does not exist'
            };
        }


        return await this.wordCategoryRepository.updateWordCategory(wordCategory);
    }

    async deleteWordCategory(id: number) {
        return this.wordCategoryRepository.deleteWordCategory(id);
    }
}