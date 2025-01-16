// services/categoryService.js
const Category = require('../models/category');

class CategoryService {
    async getAllCategories() {
        try {
            return await Category.find().sort({ name: 1 }); // Sort categories alphabetically
        } catch (error) {
            throw new Error('Failed to fetch categories');
        }
    }

    async addCategory(name) {
        try {
            // Check if the category already exists
            const existingCategory = await Category.findOne({ name });
            if (existingCategory) {
                throw new Error('Category already exists');
            }

            // Create a new category
            const newCategory = new Category({ name });
            return await newCategory.save();
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async deleteCategoryByName(name) {
        const category = await Category.findOne({ name });
    
        if (!category) {
            throw new Error('Category not found');
        }
    
        await Category.findOneAndDelete({ name }); // Delete the category by name
    }
}

module.exports = new CategoryService();
