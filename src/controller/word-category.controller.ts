
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { messages } from "../assets/messages";
import { WordCategoryService } from "../service/word-category.service";
import { validateWordCategory } from "../schemas/word-category.schema";

export class WordCategoryController {
    private wordCategoryService = new WordCategoryService();

    constructor() { 
        this.wordCategoryService = new WordCategoryService();
    }

    public getWordCategoryById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const wordCategory = await this.wordCategoryService.findWordCategoryById(id);
            return res.status(wordCategory.status).send(wordCategory.message);
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
        const wordCategory = req.body;
        const { error } = validateWordCategory(wordCategory);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            const createdWordCategory = await this.wordCategoryService.createWordCategory(wordCategory);
            return res.status(createdWordCategory.status).send(createdWordCategory.message);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    public updateWordCategory = async (req: Request, res: Response) => {
        const { id } = req.params;
        const wordCategory = req.body;
        const { error } = validateWordCategory(wordCategory);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        try {
            const updatedWordCategory = await this.wordCategoryService.updateWordCategory(id, wordCategory);
            return res.status(updatedWordCategory.status).send(updatedWordCategory.message);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    public deleteWordCategory = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const deletedWordCategory = await this.wordCategoryService.deleteWordCategory(id);
            return res.status(deletedWordCategory.status).send(deletedWordCategory.message);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
}