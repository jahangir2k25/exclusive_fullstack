const { Router } = require("express");
const secureMiddleware = require("../middleware/secureMiddleware");
const {
    addProductController,
    getProductsController,
    editProductController,
    deleteProductController,
} = require("../controller/productController");
const router = Router();

router.get("/product", getProductsController);
router.post("/product/add", addProductController);
router.put("/product/:id", editProductController);
router.delete("/product/:id", deleteProductController);

module.exports = router;
