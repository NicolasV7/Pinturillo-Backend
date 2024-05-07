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
        sutatus: 404,
        message: messages.wordCategory.notFound,
      };
    }

    const wordCategory = await this.wordCategoryRepository.findWordCategoryById(id);
    return {
      status: 200,
      message: wordCategory,
    };
  }

  async createWordCategory(wordCategory: WordCategory) {
    const idWord = await this.wordRepository.findWordById(wordCategory.id_word);
    const idCategory = await this.categoryRepository.findById(wordCategory.id_category);

    if (!idWord || !idCategory) {
      return {
        status: 404,
        message: messages.wordCategory.notFound,
      };
    }

    const existingWordCategory = await this.wordCategoryRepository.findWordCategoryByWordIdAndCategoryId(wordCategory.id_word, wordCategory.id_category);
    if (existingWordCategory) {
      return {
        status: 409,
        message: messages.wordCategory.alreadyExists,
      };
    }
    
    await this.wordCategoryRepository.createWordCategory(wordCategory);
    return {
      status: 201,
      message: messages.wordCategory.created,
    };
  }

  //? Fix this update method

  async updateWordCategory(id: string, wordCategory: WordCategory) {
    const wordCategoryData =
      await this.wordCategoryRepository.findWordCategoryById(id);
    if (!wordCategoryData) {
      return {
        status: 404,
        message: messages.wordCategory.notFound,
      };
    }

    await this.wordCategoryRepository.updateWordCategory(id, wordCategory);
    return {
      status: 200,
      message: messages.wordCategory.updated,
    };
  }

  async deleteWordCategory(id: string) {
    await this.wordCategoryRepository.deleteWordCategory(id);
    return {
      status: 200,
      message: messages.wordCategory.deleted,
    };
  }
}
