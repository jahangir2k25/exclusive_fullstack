const { Router } = require("express");
const secureMiddleware = require("../middleware/secureMiddleware");
const
    {
        createCategoryController,
        getCategoryController,
        deleteCategoryController,
        updateCategoryController,
    } = require("../controller/categoryController");

const router = Router();


router.get("/category", getCategoryController);
router.post("/category", createCategoryController);
router.delete("/category/:categoryId", deleteCategoryController);
router.put("/category/:categoryId", updateCategoryController);


module.exports = router;