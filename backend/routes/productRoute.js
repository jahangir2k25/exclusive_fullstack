const { Router } = require("express");
const secureMiddleware = require("../middleware/secureMiddleware");
const {
    addProductController,
    getProductsController,
    updateProductController,
    deleteProductController,
} = require("../controller/productController");
const router = Router();

router.get("/product", getProductsController);
router.post("/product/add", addProductController);
router.put("/product/:productId", updateProductController);
router.delete("/product/:productId", deleteProductController);

module.exports = router;
