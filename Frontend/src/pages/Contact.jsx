import { useState } from "react";
import Layout from "../components/Layout";
import { ToastMessage } from "../components/ToastMessage";

export default function Contact() {
  const [toast, setToast] = useState(null)
  const [form, setForm] = useState({
    subject: "",
    email: "",
    message: ""
  });

  const { subject, email, message } = form

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://proyectofinal-fullstack-1-7xiw.onrender.com/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })

      const responseData = await response.json()

      if (!subject || !email || !message) {
        setToast({ msg: "Campos incompletos", color: "red" })
        setTimeout(() => setToast(null), 4000)
        return
      }

      if (!responseData) {
        setToast({ msg: "Data Invalida", color: "red" })
        setTimeout(() => setToast(null), 4000)
        return
      } else {
        setToast({ msg: "Mensaje enviado", color: "green" })
        setTimeout(() => setToast(null), 4000)
      }

      console.log(responseData)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Layout>
      {toast && <ToastMessage msg={toast.msg} color={toast.color} />}
      <section className="contact-section">
        <h1>Contacto</h1>
        <h3>Si deseas comunicarte con nosotros, dejanos un mensaje y nos comunicaremos a la brevedad!</h3>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div>
            <label>Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Asunto</label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Mensaje</label>
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Enviar</button>
        </form>
      </section>
    </Layout>
  );
}
