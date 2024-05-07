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

    async findWordByText(text: string) {
        const wordData = await this.wordRepository.findWordByText(text);
        if (!wordData) {
            return {
                status: 404,
                message: messages.word.notFoundByText,
            };
        }
        const word = await this.wordRepository.findWordByText(text);
        return {
            status: 200,
            message: word,
        };
    }
    
    async findWordById(id: string) {
        const wordData = await this.wordRepository.findWordById(id);
        if (!wordData) {
            return {
                status: 404,
                message: messages.word.notFoundById,
            };
        }
        const word = await this.wordRepository.findWordById(id);
        return {
            status: 200,
            message: word,
        };
    }

    async createWord(word: Word) {
        const wordCreate = await this.wordRepository.findWordByText(word.text);
        if (wordCreate) {
            return {
                status: 409,
                message: messages.word.alreadyExists,
            };
        }

        await this.wordRepository.createWord(word); 
        return {
            status: 201,
            message: messages.word.created,
        };
    }

    async updateWord(id: string, word: Word) {
        const wordData = await this.wordRepository.findWordById(id);
        if (!wordData) {
            return {
                status: 404,
                message: messages.word.notFoundById,
            };
        }
        await this.wordRepository.updateWord(id, word);
        return {
            status: 200,
            message: messages.word.updated,
        };
    }

    async deleteWord(id: string) {
        await this.wordRepository.deleteWord(id);
        return {
            status: 200,
            message: messages.word.deleted,
        };
    }
}