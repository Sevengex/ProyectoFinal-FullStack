import { z } from "zod"

const contactSchema = z.object({
  email: z.string().email("Email inválido"),
  subject: z.string().min(3).max(60),
  message: z.string().min(10).max(1000),
})

export const contactValidator = contactSchema