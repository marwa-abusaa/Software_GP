// controllers/categoryController.js
const categoryService = require('../services/categoryService');

class CategoryController {
    async getAllCategories(req, res) {
        try {
            const categories = await categoryService.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async addCategory(req, res) {
        try {
            const { name } = req.body;

            if (!name || name.trim() === '') {
                return res.status(400).json({ error: 'Category name is required' });
            }

            const newCategory = await categoryService.addCategory(name);
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async deleteCategory(req, res) {
        try {
            const { id } = req.params;
    
            if (!id) {
                return res.status(400).json({ error: 'Category ID is required' });
            }
    
            await categoryService.deleteCategoryByName(id);
            res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
}

module.exports = new CategoryController();
