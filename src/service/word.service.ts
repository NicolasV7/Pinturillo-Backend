import { WordRepository } from "../repository/word.repository";

export class WordService {
    private wordRepository: WordRepository;

    constructor() {
        this.wordRepository = new WordRepository();
    }

    async getAllWords() {
        return await this.wordRepository.getAllWords();
    }

    async findWordById(id: number) {
        const wordData = await this.wordRepository.findWordById(id);
        if (!wordData) {
            return {
                message: 'Word Id does not exist'
            };
        }

        return await this.wordRepository.findWordById(id);
    }

    async getWordByName(name: string) {
        const wordData = await this.wordRepository.getWordByName(name);
        if (!wordData) {
            return {
                message: 'The name of the word does not exist'
            };
        }

        return await this.wordRepository.getWordByName(name);
    }

    async createWord(word: any) {
        const wordData = await this.wordRepository.getWordByName(word.name);
        if (wordData) {
            return {
                message: 'Word already exists'
            };
        }
        return await this.wordRepository.createWord(word);

    }

    async updateWord(word: any) {
        const wordData = await this.wordRepository.findWordById(word.id);
        if (!wordData) {
            return {
                message: 'Word does not exist'
            };
        }

        return await this.wordRepository.updateWord(word);
    }

    async deleteWord(id: number) {
        return this.wordRepository.deleteWord(id);
    }
}