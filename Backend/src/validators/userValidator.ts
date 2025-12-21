import { z } from "zod"

const registerValidator = z.object({
  email: z
    .string()
    .min(9, "El email es muy corto")
    .max(20, "El email es muy largo")
    .email(),

  password: z
    .string()
    .min(5, "La contraseña debe tener al menos 5 caracteres")
    .max(15, "La contraseña no puede superar 15 caracteres")
})

const loginValidator = z.object({
  email: z
    .string()
    .email(),

  password: z
    .string()
})

export { registerValidator, loginValidator }

