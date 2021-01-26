import express from "express"
const router = express.Router()
import {getProducts,getProductById,deleteProduct, updateProduct,createProduct,createProductReview,getTopProducts,
    getAscendedProducts,getDescendedProducts,getLowestPriceProducts,getHighestPriceProducts
} from "../controllers/productControllers.js"
import {protect,admin} from "../middleware/authMiddleware.js"

router.route("/").get(getProducts).post(protect,admin,createProduct)
router.route("/sort/ascended").get(getAscendedProducts)
router.route("/sort/descended").get(getDescendedProducts)
router.route("/sort/lowestprice").get(getLowestPriceProducts)
router.route("/sort/highestprice").get(getHighestPriceProducts)
router.route("/:id/reviews").post(protect,createProductReview)
router.get("/top",getTopProducts)
router.route("/:id").get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)


export default router