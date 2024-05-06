import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { messages } from "../assets/messages";
import { Word } from "../entity/word.entity";
import { WordDTO } from "../dto/word.dto";
import { WordService } from "../service/word.service";
import { validateWord } from "../schemas/word.schema";

export class WordController {
    private wordService = new WordService();

    constructor() {
        this.wordService = new WordService();
    }

    public getWordById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const word = await this.wordService.findWordById(id);
            return res.status(200).send(word);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    };

    public getAllWords = async (_: Request, res: Response) => {
        try {
            const words = await this.wordService.getAllWords();
            return res.status(200).send(words);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    };

    public createWord = async (req: Request, res: Response) => {
        const wordDTO: WordDTO = req.body;
        const { error } = validateWord(wordDTO);
        if (error) return res.status(400).send(error.details[0].message);

        const word = new Word();
        word.id = uuidv4();
        word.text = wordDTO.text as string;

        try {
            await this.wordService.createWord(word);
            return res.status(201).send(messages.word.created);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    };

    public updateWord = async (req: Request, res: Response) => {
        const { id } = req.params;
        const wordDTO: WordDTO = req.body;
        const { error } = validateWord(wordDTO);
        if (error) return res.status(400).send(error.details[0].message);

        const word = new Word();
        word.text = wordDTO.text as string;

        try {
            await this.wordService.updateWord(id, word);
            return res.status(200).send(messages.word.updated);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    };

    public deleteWord = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await this.wordService.deleteWord(id);
            return res.status(200).send(messages.word.deleted);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    };
}