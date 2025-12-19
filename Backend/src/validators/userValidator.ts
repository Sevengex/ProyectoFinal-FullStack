import { z } from "zod"

const registerValidator = z.object({
  email: z
    .string({ error: "El email es obligatorio" })
    .min(5, "El email es muy corto")
    .max(50, "El email es muy largo")
    .email("Email inválido"),

  password: z
    .string({ error: "La contraseña es obligatoria" })
    .min(5, "La contraseña debe tener al menos 5 caracteres")
    .max(15, "La contraseña no puede superar 15 caracteres")
})

const loginValidator = z.object({
  email: z
    .string({ error: "El email es obligatorio" })
    .email("Email inválido"),

  password: z
    .string({ error: "La contraseña es obligatoria" })
    .min(5, "La contraseña debe tener al menos 5 caracteres")
})

export { registerValidator, loginValidator }

