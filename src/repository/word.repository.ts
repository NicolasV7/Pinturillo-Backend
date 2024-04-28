import { UpdateResult } from "typeorm";
import { AppDataSource } from "@/data-source";
import { Word } from "@entity/word.entity";

export class WordRepository {
    private repository = AppDataSource.getRepository(Word);

    async getAllWords(): Promise<Word[]> {
        return this.repository.find();
    }

    async findWordById(id: number): Promise<Word> {
        return this.repository.findOneBy({ id })
    }

    async getWordByName(text: string): Promise<Word> {
        return this.repository.findOneBy({ text });
    }

    async createWord(word: Word): Promise<Word> {
        return this.repository.save(word);
    }

    async updateWord(word: Word): Promise<UpdateResult> {
        return this.repository.update(word.id, word);
    }

    async deleteWord(id: number): Promise<void> {
        await this.repository.delete(id);
    }

}