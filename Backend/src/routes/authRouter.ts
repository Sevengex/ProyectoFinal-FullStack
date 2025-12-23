import { Router } from "express"
import AuthController from "../controllers/authController"

const authRouter = Router()

authRouter.post("/register", AuthController.Register)
authRouter.post("/login", AuthController.Login)

export default authRouter