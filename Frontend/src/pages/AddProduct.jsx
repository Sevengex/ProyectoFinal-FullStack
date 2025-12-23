import { useState } from "react"
import Layout from "../components/Layout"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { ToastMessage } from "../components/ToastMessage"

const AddProduct = () => {
  const [toast, setToast] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: ""
  })

  const { name, description, price, stock, category } = formData

  const navigate = useNavigate()

  const { token } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dataToSend = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    }

    try {
      const response = await fetch(`https://proyectofinal-fullstack-1-7xiw.onrender.com/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(dataToSend)
      })

      if (!name || !description || !price || !stock || !category) {
        setToast({ msg: "❌Campos incompletos", color: "red" })
        setTimeout(() => setToast(null), 4000)
        return
      }

      if (!response.ok) {
        setToast({ msg: "❌ Error al cargar el producto", color: "red" })
        setTimeout(() => setToast(null), 4000)
        return
      } else {
        setToast({ msg: "✅ Éxito al guardar el nuevo producto", color: "green" })
        setTimeout(() => setToast(null), 4000)
        setTimeout(() => {
          navigate("/")
        }, 2000)
      }

      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: ""
      })

    } catch (error) {

    }
  }

  const handleChange = (e) => {
    const nombreDeInput = e.target.name
    setFormData({ ...formData, [nombreDeInput]: e.target.value })
  }

  return (
    <Layout>
      {toast && <ToastMessage msg={toast.msg} color={toast.color} />}
      <div className="page-banner">Agregar Nuevo Producto</div>

      <section className="page-section">
        <form className="form-container"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="text"
            placeholder="Nombre"
            name="name"
            minLength={3}
            maxLength={20}
            onChange={(e) => handleChange(e)}
            value={formData.name}
          />
          <input
            type="text"
            placeholder="Descripción"
            name="description"
            minLength={3}
            maxLength={200}
            onChange={(e) => handleChange(e)}
            value={formData.description}
          />
          <input
            type="number"
            placeholder="Precio"
            name="price"
            min={0}
            onChange={(e) => handleChange(e)}
            value={formData.price}
          />
          <input
            type="number"
            placeholder="Stock"
            name="stock"
            min={0}
            onChange={(e) => handleChange(e)}
            value={formData.stock}
          />
          <input
            type="text"
            placeholder="Categoría"
            name="category"
            minLength={3}
            maxLength={20}
            onChange={(e) => handleChange(e)}
            value={formData.category}
          />
          <button type="submit">Agregar</button>
        </form>
      </section>
    </Layout>
  )
}

export default AddProduct
