import { useNavigate } from "react-router-dom"
import Layout from "../components/Layout"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import { ToastMessage } from "../components/ToastMessage"

const Login = () => {
  const [toast, setToast] = useState(null)

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const { login } = useAuth()
  const navigateUser = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const responseData = await response.json()

      if (responseData.error) {
        setToast({ msg: "Datos inválidos", color: "red" })
        setTimeout(() => setToast(null), 4000)
        return
      }

      login(responseData.token)
      navigateUser("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      {toast && <ToastMessage msg={toast.msg} color={toast.color} />}
      <div className="center-auth">
        <form className="form-container" onSubmit={handleSubmit}>
          <h3>Iniciar Sesión</h3>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            onChange={handleChange}
            required
          />
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </Layout>
  )
}

export default Login
