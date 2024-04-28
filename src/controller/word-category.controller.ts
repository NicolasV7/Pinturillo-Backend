
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { messages } from "@assets/messages";
import { Word } from "@/entity/word.entity";
import { WordDTO } from "@/dto/word.dto";
import { WordCategoryService } from "@service/word-category.service";
import { validateWord } from "@schemas/word.schema";

export class WordCategoryController {
    private wordCategoryService = new WordCategoryService();

    constructor() { 
        this.wordCategoryService = new WordCategoryService();
    }

    public getWordCategoryById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const wordCategory = await this.wordCategoryService.findWordCategoryById(id);
            return res.status(200).send(wordCategory);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    };

    public getAllWordsCategories = async (_: Request, res: Response) => {
        try {
            const wordsCategories = await this.wordCategoryService.getAllWordsCategories();
            return res.status(200).send(wordsCategories);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    };

    public createWordCategory = async (req: Request, res: Response) => {
        const wordDTO: WordDTO = req.body;
        const { error } = validateWord(wordDTO);
        if (error) return res.status(400).send(error.details[0].message);

        const wordCategory = new Word();
        wordCategory.id = uuidv4();
        wordCategory.text = wordDTO.text as string;

        //Pausing here
    };


}