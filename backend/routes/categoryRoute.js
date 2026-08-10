const { Router } = require("express");
const secureMiddleware = require("../middleware/secureMiddleware");
const
    {
        createCategoryController,
        getCategoryController,
        deleteCategoryController
    } = require("../controller/categoryController");

const router = Router();


router.get("/category", getCategoryController);
router.post("/category", createCategoryController);
router.delete("/category/:categoryId", deleteCategoryController);


module.exports = router;