import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../model/UserModel"
import { registerValidator, loginValidator } from "../validators/userValidator"


class authController {
  //method: POST 
  static Register = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { email, password } = req.body

      const validator = registerValidator.safeParse({ email, password })

      console.log(validator)
      if (!validator.success) {
        return res.status(400).json({ success: false, error: validator.error.flatten().fieldErrors });
      }

      if (!email || !password) {
        return res.status(400).json({ success: false, message: "Datos invalidos" })
      }

      const user = await User.findOne({ email })

      if (user) {
        return res.status(409).json({ success: false, error: "El usuario ya existe en la base de datos." })
      }

      const hash = await bcrypt.hash(password, 10)
      const newUser = new User({ email, password: hash })

      await newUser.save()

      res.json({ success: true, data: newUser })
    } catch (e) {
      const error = e as Error
      switch (error.name) {
        case "MongoServerError":
          return res.status(409).json({ success: false, error: "Usuario ya existente en nuestra base de datos" })
      }
    }
  }

  static Login = async (req: Request, res: Response): Promise<void | Response> => {
    const SECRET_KEY = process.env.JWT_SECRET!
    try {
      const { email, password } = req.body

      const validator = loginValidator.safeParse({ email, password })

      console.log(validator)
      if (!validator.success) {
        return res.status(400).json({ success: false, error: validator.error.flatten().fieldErrors });
      }

      if (!email || !password) {
        return res.status(400).json({ success: false, error: "Datos invalidos" })
      }

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(401).json({ success: false, error: "No autorizado" })
      }

      const isValid = await bcrypt.compare(password, user.password)

      if (!isValid) {
        return res.status(401).json({ success: false, error: "No autorizado" })
      }

      const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" })
      res.json({ success: true, token })
    } catch (e) {
      const error = e as Error
      res.status(500).json({ success: false, error: error.message })
    }
  }
}

export default authController