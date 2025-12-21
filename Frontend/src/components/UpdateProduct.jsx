import { useState } from "react"
import { useAuth } from "../context/AuthContext"

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

      if (!response.ok) {
        setToast({ msg: "❌ Error al actualizar el producto", color: "red" })
        setTimeout(() => setToast(null), 4000)
        return
      } else {
        setToast({ msg: "✅ Éxito al actualizar el nuevo producto", color: "green" })
        setTimeout(() => setToast(null), 4000)
      }

      onUpdate()
      onClose()
    } catch (e) {

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