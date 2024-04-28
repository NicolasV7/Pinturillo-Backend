import { WordCategoryService } from "../services/word-category.service";

export class WordCategoryController {
    private wordCategoryService: WordCategoryService;

    constructor() {
        this.wordCategoryService = new WordCategoryService();
    }

    public getAllWordsCategories = async (req: any, res: any) => {
        try {
            const wordCategories = await this.wordCategoryService.getAllWordsCategories();
            return res.status(200).send(wordCategories);
        } catch (error) {
            return res.status(500).send(error.message);
        }    
        
    }

    public findWordCategoryById = async (req: any, res: any) => {
        const id = req.params;
        try {
            const wordCategory = await this.wordCategoryService.findWordCategoryById(id);
            return res.status(200).send(wordCategory);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    public createWordCategory = async (req: any, res: any) => {
        const wordCategory = req.body;
        try {
            await this.wordCategoryService.createWordCategory(wordCategory);
            return res.status(201).send(wordCategory);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    public updateWordCategory = async (req: any, res: any) => {
        const wordCategory = req.body;
        try {
            await this.wordCategoryService.updateWordCategory(wordCategory);
            return res.status(200).send(wordCategory);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    public deleteWordCategory = async (req: any, res: any) => {
        const id = req.params;

        try {
            await this.wordCategoryService.deleteWordCategory(id);
            return res.status(200).send({message: 'Word Category deleted successfully'});
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    
    
}