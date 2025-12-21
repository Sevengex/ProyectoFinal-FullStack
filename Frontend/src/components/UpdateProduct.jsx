import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { ToastMessage } from "./ToastMessage"

const UpdateProduct = ({ product, onClose, onUpdate }) => {
  const [toast, setToast] = useState(null)
  const [loader, setLoader] = useState(false)
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    stock: Number(product.stock),
    price: Number(product.price),
    category: product.category
  })

  const { token } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dataToUpdate = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock)
    }

    try {
      setLoader(true)
      const response = await fetch(`http://localhost:3000/products/${product._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(dataToUpdate)
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || data.success === false) {
        const msg =
          (typeof data.error === "string" && data.error) ||
          data.message ||
          "❌ Error al actualizar el producto"

        setToast({ msg, color: "red" })
        setTimeout(() => setToast(null), 4000)
        return
      }
      setToast({ msg: "✅ Producto actualizado con éxito", color: "green" })
      setTimeout(() => {
        setToast(null)
        onUpdate()
        onClose()
      }, 1200)


    } catch (e) {
      setToast({ msg: "❌ No se pudo conectar con el servidor", color: "red" })
      setTimeout(() => setToast(null), 4000)
    } finally {
      setLoader(false)
    }
  }

  return (
    <section className="modal-overlay">
      {toast && <ToastMessage msg={toast.msg} color={toast.color} />}
      <div className="modal-box">
        <h2>Editar producto</h2>
        <form className="form-container" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
          <input
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
          />
          <input
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
          />
          <button type="submit">{loader ? "Enviando..." : "Enviar"}</button>
        </form>
        <button className="close-btn" type="button" onClick={onClose}>Cancelar</button>
      </div>
    </section>
  )
}

export default UpdateProduct