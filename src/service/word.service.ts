import { messages } from "../assets/messages";
import { Word } from "../entity/word.entity";
import { WordRepository } from "../repository/word.repository";


export class WordService {
    private wordRepository = new WordRepository();
    
    constructor() {
        this.wordRepository = new WordRepository();
    }
    
    async getAllWords() {
        return await this.wordRepository.getAllWords();
    }
    
    async findWordById(id: string) {
        const wordData = await this.wordRepository.findWordById(id);
        if (!wordData) {
            return {
                message: messages.word.notFoundById,
            };
        }
        return await this.wordRepository.findWordById(id);
    }

    async createWord(word: Word) {
        const wordCreate = await this.wordRepository.findWordByText(word.text);
        if (wordCreate) {
            return {
                message: messages.word.alreadyExists,
            };
        }
        return await this.wordRepository.createWord(word);
    }

    async updateWord(word: Word) {
        const wordUpdate = await this.wordRepository.findWordById(word.id);
        if (!wordUpdate) {
            return {
                message: messages.word.notFound,
            };
        }
        return await this.wordRepository.updateWord(word);
    }

    async deleteWord(id: string) {
        return await this.wordRepository.deleteWord(id);
    }
}