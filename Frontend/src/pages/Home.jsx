import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import UpdateProduct from "../components/UpdateProduct"
import { useAuth } from "../context/AuthContext"
import { CATEGORIES } from "../constants/categories.js"
import { ToastMessage } from "../components/ToastMessage.jsx"

const Home = () => {
  const initialErrorState = {
    success: null,
    notification: null,
    error: {
      fetch: null,
      delete: null
    }
  }

  const [confirmDelete, setConfirmDelete] = useState(null)
  const [toast, setToast] = useState(null)
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [filters, setFilters] = useState({
    name: "",
    stock: 0,
    category: "",
    minPrice: 0,
    maxPrice: 0
  })
  const [responseServer, setResponseServer] = useState(initialErrorState)

  const { user, token } = useAuth()

  const fetchingProducts = async (query = "") => {
    setResponseServer(initialErrorState)
    try {
      const response = await fetch(`https://proyectofinal-fullstack-1-7xiw.onrender.com/products?${query}`, {
        method: "GET"
      })
      const dataProducts = await response.json()
      setProducts(dataProducts.data.reverse())
      setResponseServer({
        success: true,
        notification: "",
        error: {
          ...responseServer.error,
          fetch: true
        }
      })
    } catch (e) {
      console.log(e.message)
      setResponseServer({
        success: false,
        notification: "Error al traer los datos",
        error: {
          ...responseServer.error,
          fetch: false
        }
      })
    }
  }

  useEffect(() => {
    fetchingProducts()
  }, [])

  const deleteProduct = async (idProduct) => {

    try {
      const response = await fetch(`https://proyectofinal-fullstack-1-7xiw.onrender.com/products/${idProduct}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      })

      const dataResponse = await response.json()

      if (!response.ok || dataResponse.error) {
        setResponseServer({
          success: false,
          notification: dataResponse.error || "Error al borrar el producto",
          error: { fetch: null, delete: true }
        })
        setTimeout(() => setResponseServer(initialErrorState), 3000)
        return
      }

      setProducts((prev) => prev.filter((p) => p._id !== idProduct))

      setResponseServer({
        success: true,
        notification: `${dataResponse.deletedProduct.name} borrado con éxito.`,
        error: { fetch: null, delete: null }
      })
      setTimeout(() => setResponseServer(initialErrorState), 3000)

    } catch (e) {
      setToast({ msg: "Error al borrar el producto", color: "red" })
      setTimeout(() => setToast(null), 4000)
      console.log(e.message)
    }
  }


  const handleUpdateProduct = (p) => {
    setSelectedProduct(p)
  }

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const query = new URLSearchParams()

    if (filters.name) query.append("name", filters.name)
    if (filters.stock) query.append("stock", filters.stock)
    if (filters.category) query.append("category", filters.category)
    if (filters.minPrice) query.append("minPrice", filters.minPrice)
    if (filters.maxPrice) query.append("maxPrice", filters.maxPrice)

    fetchingProducts(query.toString())
  }

  const handleResetFilters = () => {
    setFilters({
      name: "",
      stock: 0,
      category: "",
      minPrice: 0,
      maxPrice: 0
    })
    fetchingProducts("")
  }

  return (
    <Layout>
      {confirmDelete && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>¿Eliminar producto?</h3>
            <p>Esta acción no se puede deshacer.</p>

            <div className="card-actions">
              <button
                onClick={() => {
                  deleteProduct(confirmDelete)
                  setConfirmDelete(null)
                }}
              >
                Sí, borrar
              </button>

              <button
                className="close-btn"
                onClick={() => setConfirmDelete(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      {toast && <ToastMessage msg={toast.msg} color={toast.color} />}
      {responseServer.notification && (
        <ToastMessage
          msg={responseServer.notification}
          color={responseServer.success ? "green" : "red"}
        />
      )}
      <div className="page-banner">
        <div className="page-banner__content">
          <h1 className="page-banner__title">
            Bienvenidos a <span className="accent">Harmony</span> <span className="accent-2">Music Store</span>
          </h1>
          <p className="page-banner__subtitle">Tu tienda de instrumentos musicales</p>
        </div>
      </div>

      <section className="filters-section">
        <h3 className="filters-title">Filtrar Instrumentos</h3>
        <form className="filters-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Buscar por nombre"
            onChange={handleChange}
            value={filters.name}
          />
          <input
            type="number"
            name="stock"
            placeholder="Ingrese el stock"
            onChange={handleChange}
            value={filters.stock}
          />
          <select
            name="category"
            onChange={handleChange}
            value={filters.category}
          >
            <option value="">Todas las categorias</option>
            {
              CATEGORIES.map((category) =>
                <option key={category.id}
                  value={category.value}>{category.content}
                </option>
              )
            }
          </select>
          <input
            type="number"
            name="minPrice"
            placeholder="Precio mínimo"
            onChange={handleChange}
            value={filters.minPrice}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Precio máximo"
            onChange={handleChange}
            value={filters.maxPrice}
          />
          <button type="submit">Aplicar filtros</button>
          <button type="button" onClick={handleResetFilters}>Cancelar</button>
        </form>
      </section>

      {
        selectedProduct &&
        <UpdateProduct
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdate={fetchingProducts}
        />
      }

      <section className="products-grid">
        {products.map((p, i) => (
          <div key={i} className="product-card">
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p><strong>Precio:</strong> ${p.price}</p>
            <p><strong>Stock:</strong> {p.stock}</p>
            <p><strong>Categoría:</strong> {p.category}</p>
            {
              user && <div className="cont-btn">
                <button onClick={() => handleUpdateProduct(p)}>Actualizar</button>
                <button onClick={() => setConfirmDelete(p._id)}>Borrar</button>
              </div>
            }
          </div>
        ))}
      </section>

    </Layout>
  )
}

export default Home
