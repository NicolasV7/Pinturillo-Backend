import { AppDataSource } from "../data-source";
import { Word } from "../entity/word.entity";

export class WordRepository {
    private dataSource = AppDataSource.getRepository(Word);

    async getAllWords(){
        return this.dataSource.find();
    }

    async findWordById(id: string){
        return this.dataSource.findOneBy({ id });
    }

    async createWord(word: Word){
        return this.dataSource.save(word);
    }

    async updateWord(string: string, word: Word){
        return this.dataSource.update(string, word);
    }

    async deleteWord(id: string){
        return this.dataSource.delete(id);
    }

    async findWordByText(text: string){
        return this.dataSource.findOneBy({ text });
    }

}