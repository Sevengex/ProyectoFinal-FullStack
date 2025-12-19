import { Router } from "express"
import ProductController from "../controllers/productController"
import authMiddleware from "../middleware/authMiddleware"
import upload from "../middleware/uploadMiddleware"

const productRouter = Router()

productRouter.get("/", ProductController.getAllProducts)
productRouter.get("/:id", ProductController.getProduct)
productRouter.post("/", authMiddleware, upload.single("image"), ProductController.addProduct)
productRouter.patch("/:id", authMiddleware, ProductController.updateProduct)
productRouter.delete("/:id", authMiddleware, ProductController.deleteProduct)

export default productRouter