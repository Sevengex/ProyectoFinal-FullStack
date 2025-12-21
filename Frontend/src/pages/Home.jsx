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
      const response = await fetch(`http://localhost:3000/products?${query}`, {
        method: "GET"
      })
      const dataProducts = await response.json()
      setProducts(dataProducts.data.reverse())
      setResponseServer({
        success: true,
        notification: "Exito al cargar los productos",
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
    if (!confirm("Esta seguro de que quieres borrar el producto")) return

    try {
      const response = await fetch(`http://localhost:3000/products/${idProduct}`, {
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
      console.log(e.message)
      setResponseServer({
        success: false,
        notification: "Error al borrar el producto",
        error: { fetch: null, delete: true }
      })
      setTimeout(() => setResponseServer(initialErrorState), 3000)
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
  }

  return (
    <Layout>
      <div className="page-banner">Harmony Music Store</div>

      <section className="page-section">
        <p>
          Bienvenido {user && user.id} a nuestra tienda. Aquí encontrarás una amplia variedad de productos diseñados para satisfacer
          tus necesidades. Nuestro compromiso es ofrecer calidad y confianza.
        </p>
      </section>

      <section >
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
            <option defaultValue>Todas las categorias</option>
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
                <button onClick={() => deleteProduct(p._id)}>Borrar</button>
              </div>
            }
          </div>
        ))}
      </section>
    </Layout>
  )
}

export default Home
