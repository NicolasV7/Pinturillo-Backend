import { messages } from "../assets/messages";
import { WordCategory } from "../entity/word-category.entity";
import { CategoryRepository } from "../repository/category.repository";
import { WordCategoryRepository } from "../repository/word-category.repository";
import { WordRepository } from "../repository/word.repository";

export class WordCategoryService {
  private wordCategoryRepository = new WordCategoryRepository();
  private wordRepository = new WordRepository();
  private categoryRepository = new CategoryRepository();

  constructor() {
    this.wordCategoryRepository = new WordCategoryRepository();
    this.wordRepository = new WordRepository();
    this.categoryRepository = new CategoryRepository();
  }

  async getAllWordsCategories() {
    return await this.wordCategoryRepository.getAllWordsCategories();
  }

  async findWordCategoryById(id: string) {
    const wordCategoryData =
      await this.wordCategoryRepository.findWordCategoryById(id);
    if (!wordCategoryData) {
      return {
        message: messages.wordCategory.notFound,
      };
    }

    return await this.wordCategoryRepository.findWordCategoryById(id);
  }

  async createWordCategory(wordCategory: WordCategory) {
    const idWord = await this.wordRepository.findWordById(wordCategory.id_word);
    const idCategory = await this.categoryRepository.findById(
      wordCategory.id_category
    );
    if (!idWord || !idCategory) {
      return {
        message: messages.wordCategory.notFound,
      };
    }
    if (await this.wordCategoryRepository.findWordCategoryById(wordCategory.id)) {
      return {
        message: messages.wordCategory.alreadyExists,
      };
    }

    return await this.wordCategoryRepository.createWordCategory(wordCategory);
  }

  async updateWordCategory(id: string, wordCategory: WordCategory) {
    const wordCategoryData =
      await this.wordCategoryRepository.findWordCategoryById(id);
    if (!wordCategoryData) {
      return {
        message: messages.wordCategory.notFound,
      };
    }

    return await this.wordCategoryRepository.updateWordCategory(id, wordCategory);
  }

  async deleteWordCategory(id: string) {
    return await this.wordCategoryRepository.deleteWordCategory(id);
  }
}
