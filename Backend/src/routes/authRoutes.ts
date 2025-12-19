import { Router } from "express"
import userController from "../controllers/authController"
import limiter from "../middleware/rateLimitMiddleware"

const authRoutes = Router()

authRoutes.post("/register", userController.Register)
authRoutes.post("/login", limiter, userController.Login)

export default authRoutes 