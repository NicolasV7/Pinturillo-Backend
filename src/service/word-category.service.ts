import { messages } from "@/assets/messages";
import { WordCategory } from "@entity/word-category.entity";
import { CategoryRepository } from "@repository/category.repository";
import { WordCategoryRepository } from "@repository/word-category.repository";
import { WordRepository } from "@repository/word.repository";

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
}
