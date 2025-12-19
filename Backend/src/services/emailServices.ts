import { Request, Response } from "express"
import createTemplate from "../templates/emailTemplate"
import transporter from "../config/emailConfig"


const emailService = async (req: Request, res: Response) => {
  const { subject, email: emailUser, message } = req.body

  if (!subject || !emailUser || !message) {
    return res.status(400).json({ success: false, message: "Data invalida" })
  }

  try {
    const info = await transporter.sendMail({
      from: `"Tienda de software Pepito" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: emailUser,
      subject,
      html: createTemplate(message),
    })

    res.json({ success: true, message: "Correo enviado exitosamente", info })

  } catch (e) {
    const error = e as Error
    res.status(500).json({ success: false, error: error.message })
  }
}

export default emailService