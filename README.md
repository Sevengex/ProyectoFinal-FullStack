
- **Nombre:** Leonardo Duarte  
- **Proyecto:** harmony music store – Backend (API REST en TypeScript)  
- **Rol:** Estudiante de Desarrollo Full Stack
- **Email de contacto:** lduarte10804@gmail.com  
- **GitHub:** (https://github.com/Sevengex)  
---

## 🎓 Contexto del Trabajo Práctico

Este backend nace como resolución del **Trabajo Práctico integrador** de la materia
**Desarrollo Full Stack**, cuyo objetivo es:

- Implementar una **API RESTful** tipada con **TypeScript**.
- Aplicar **arquitectura MVC** (Model–View–Controller).
- Integrar una **base de datos MongoDB** con modelos y validaciones.
- Implementar:
- Autenticación y autorización vía **JWT**.
- Validación de inputs (body, params, query) con **Zod**.
- Subida de archivos (imágenes) con **Multer**.
- Rate limiting y manejo de errores.
- Desplegar el backend en **Render** y dejarlo consumible por el frontend **Render**.

---

## 🧰 Stack Tecnológico

### 🧱 Core

- 🟦 **Node.js**
- 🚂 **Express**
- 💙 **TypeScript**
- 🍃 **MongoDB + Mongoose**

### 🔐 Seguridad y Auth

- 🔑 **JWT** para autenticación y protección de rutas.
- 🧂 **bcryptjs** para hash de contraseñas.
- 🧱 **express-rate-limit** para limitar intentos (ej. login/register).

### ✅ Validaciones

- 📏 **Zod** para validar:
- Cuerpo (`req.body`)
- Parámetros (`req.params`)
- Query strings (`req.query`)

### 📦 Archivos y Email

- 📸 **Multer** para subida de imágenes de productos.
- Correo de contacto desde el formulario del frontend.
- Correo de bienvenida al registrar un usuario.
- 🧩 Templates HTML para emails.

### 📝 Logging y utilidades

- 📄 **morgan** (o logger personalizado) para logs HTTP.
- 🌱 **dotenv** para variables de entorno.
- 🧹 Manejo centralizado de errores y respuestas JSON consistentes.

---

## 🚀 Scripts (package.json)

Ejemplo de scripts configurados para desarrollo y producción:

```json
{
"scripts": {
    "dev": "ts-node-dev ./src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

### ▶️ Desarrollo

```bash
npm install
npm run dev
```

El servidor se levanta en (por ejemplo):

```text
http://localhost:3000
```

### 📦 Build + Producción local

```bash
npm run build
npm start
```

---

## 🧩 Variables de Entorno

Archivo `.env` (no se commitea). El proyecto incluye `.env.example` de referencia.

Ejemplo:

```bash
PORT=3000

# Base de datos
URI_DB=mongodb+srv://lduarte10804_db_user:NOlJv7dZD2zagOHg@cluster0.vtvapjd.mongodb.net/db_pinoles

# JWT
JWT_SECRET=contraseñasupersecreta

> 🔐 **Importante:** `JWT_SECRET` debe ser fuerte y no compartirse.  
---

## 🌐 Base URL en Producción

El backend se encuentra desplegado en Render tanto el back como el front:

```text
https://proyectofinal-fullstack-1-7xiw.onrender.com (Frontend)
https://proyectofinal-fullstack-qudi.onrender.com (Backend)

```

Ejemplos:

- `GET https://proyectofinal-fullstack-qudi.onrender.com/products`
- `POST https://proyectofinal-fullstack-qudi.onrender.com/auth/register`
- `POST https://proyectofinal-fullstack-qudi.onrender.com/auth/login`

---

## ✅ Relación con la consigna

Este backend cumple con los puntos clave del trabajo práctico:

- ✅ **Node.js + Express + TypeScript**  
- ✅ **Patrón MVC** (controllers, models, routes, middleware, services)  
- ✅ **Base de datos MongoDB** con modelos y esquemas tipados  
- ✅ **Autenticación con JWT** y protección de rutas  
- ✅ **Validación de inputs con Zod** (body, params, query)  
- ✅ **Filtros por query params en DB** (no en memoria)  
- ✅ **Subida de archivos con Multer** y exposición estática  
- ✅ **Logger + rate limiting**  
- ✅ **Deploy en Render** 

---

## 🚀 Posibles mejoras futuras

- Roles de usuario (admin / user) con permisos diferenciados.
- Soft delete de productos y recuperación.
- Paginación y ordenamiento de resultados en `/products`.
- Endpoint de métricas (ej. cantidad de productos, categorías, etc.).
- Tests unitarios y de integración (Jest, Supertest).
- Documentación interactiva con Swagger / OpenAPI.