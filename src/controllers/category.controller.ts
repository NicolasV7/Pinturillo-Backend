import { CategoryService } from "../services/category.service";

export class CategoryController {
    private categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    public getAllCategories = async (req: any, res: any) => {
        try {
            const categories = await this.categoryService.getAllCategories();            
            return res.status(200).send(categories);
        } catch (error) {
            return res.status(500).send(error.message);
        }    
        
    }

    public findCategoryById = async (req: any, res: any) => {
        const {id} = req.params;
        try {
            const category = await this.categoryService.findCategoryById(id);
            return res.status(200).send(category);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    public createCategory = async (req: any, res: any) => {
        const category = req.body;
        try {
            await this.categoryService.createCategory(category);
            return res.status(201).send({message: 'Category created successfully'});
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    public updateCategory = async (req: any, res: any) => {
        const category = req.body;
        try {
            await this.categoryService.updateCategory(category);
            return res.status(200).send({message: 'Category updated successfully'});
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    public deleteCategory = async (req: any, res: any) => {
        const {id} = req.params;
        const {name} = req.body;

        try {
            await this.categoryService.deleteCategory(id);
            return res.status(200).send({message: `Category:${name} deleted successfully`});
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

}



    