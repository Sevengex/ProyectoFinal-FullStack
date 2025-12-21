import Layout from "../components/Layout"

const AboutUs = () => {
  return (
    <Layout>
      <div className="page-banner">Sobre Nosotros</div>


      <section className="page-section">
        <h2>Nuestra Historia</h2>
        <p>
          Somos una tienda de instrumentos musicales creada para acercar la música a todos: desde quienes recién
          empiezan hasta músicos profesionales. Seleccionamos instrumentos, accesorios y equipos de sonido con foco
          en la calidad, la durabilidad y una excelente experiencia de compra.
        </p>

        <h2>Misión</h2>
        <p>
          Brindar instrumentos musicales y equipamiento confiable, con atención clara y rápida, para que cada persona
          pueda aprender, practicar y tocar con confianza.
        </p>

        <h2>Visión</h2>
        <p>
          Ser una referencia en el rubro musical, ofreciendo un catálogo moderno, una plataforma simple de usar y una
          experiencia transparente tanto para clientes como para administradores.
        </p>

        <h2>Proyecto Final FullStack</h2>
        <p>
          Este sitio forma parte de un proyecto académico en el que se desarrolló una aplicación FullStack con un
          frontend para la visualización y gestión de productos, y un backend con API REST para autenticación,
          administración y persistencia de datos.
        </p>

        <h2>Tecnologías Utilizadas</h2>
        <p>
          <strong>Frontend:</strong> React, React Router, Context API (Auth), Fetch API, CSS.
          <br />
          <strong>Backend:</strong> Node.js, Express, TypeScript, Mongoose, Zod (validaciones), JWT (autenticación),
          bcryptjs (hash de contraseñas), Multer (carga de imágenes), Nodemailer (envío de correos), express-rate-limit
          (protección contra abuso), dotenv (variables de entorno), Morgan (logs), CORS.
          <br />
          <strong>Base de datos:</strong> MongoDB.
        </p>

        <h2>Funcionalidades Destacadas</h2>
        <p>
          - Listado y filtrado de productos (nombre, stock, categoría y rango de precios).<br />
          - Alta, edición y borrado de productos (con confirmación y notificaciones).<br />
          - Autenticación (registro y login) con token JWT.<br />
          - Subida de imágenes de productos.<br />
          - Formulario de contacto con envío de correo.
        </p>
      </section>
    </Layout>
  )
}

export default AboutUs
