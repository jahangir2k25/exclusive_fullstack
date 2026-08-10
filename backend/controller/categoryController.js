const Category = require("../model/categoryModel");

const createCategoryController = async (req, res) => {
    const { categoryName } = req.body;
    const trimmedCategoryName = categoryName?.trim();

    if (!trimmedCategoryName) {
        return res.json({
            success: false,
            message: "Category Name is Required!",
            data: categoryName,
        });
    }

    const isCategory = await Category.findOne({
        categoryName: { $regex: new RegExp(`^${trimmedCategoryName}$`, "i") },
    });

    if (isCategory) {
        return res.json({
            success: false,
            message: "Category already exist!",
        });
    }

    const newCategory = await Category.create({ categoryName: trimmedCategoryName });

    res.json({
        success: true,
        message: "Category created successfully!",
        data: newCategory,
    });
};

const getCategoryController = async (req, res) => {
    const allCategory = await Category.find();

    if (allCategory.length === 0) {
        return res.json({
            success: true,
            message: "Category not found!",
            category: allCategory,
        });
    }

    res.json({
        success: true,
        message: "Category name fetched successfully!",
        category: allCategory,
    });
};

const deleteCategoryController = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found!",
            });
        }

        res.json({
            success: true,
            message: "Category deleted successfully!",
            data: deletedCategory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to delete category",
            error: error.message,
        });
    }
};

module.exports = { createCategoryController, getCategoryController, deleteCategoryController };