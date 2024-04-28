import { WordService } from "../services/word.service";

export class WordController {
    private wordService: WordService;

    constructor() {
        this.wordService = new WordService();
    }

    public getAllWords = async (req: any, res: any) => {
        try {
            const words = await this.wordService.getAllWords();
            return res.status(200).send(words);
        } catch (error) {
            return res.status(500).send(error.message);
        }    
        
    }

    public findWordById = async (req: any, res: any) => {
        const {id} = req.params;
        try {
            const word = await this.wordService.findWordById(id);
            return res.status(200).send(word);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    public getWordByName = async (req: any, res: any) => {
        const {text} = req.params;
        try {
            const word = await this.wordService.getWordByName(text);
            return res.status(200).send(word);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    public createWord = async (req: any, res: any) => {
        const {word} = req.body;
        const {text} = req.body;
        try {
            await this.wordService.createWord(word);
            return res.status(201).send({message: `Word:${text} created successfully`});
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    public updateWord = async (req: any, res: any) => {
        const word = req.body;
        try {
            await this.wordService.updateWord(word);
            return res.status(200).send({message: 'Word updated successfully'});
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    public deleteWord = async (req: any, res: any) => {
        const {id} = req.params;
        const {text} = req.body;

        try {
            await this.wordService.deleteWord(id);
            return res.status(200).send({message: `Word:${text} deleted successfully`});
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
}