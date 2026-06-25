# 🚀 UnaHur Anti-Social Net - Backend API

Backend desarrollado para **UnaHur Anti-Social Net**, una red social implementada con **MongoDB y Mongoose** bajo un modelo documental NoSQL. Permite gestionar usuarios, publicaciones, comentarios, etiquetas y relaciones de seguimiento.

---

## 📋 Funcionalidades

* Gestión de usuarios con `nickname` único.
* Creación y administración de publicaciones.
* Soporte para imágenes asociadas a posts mediante subdocumentos embebidos.
* Sistema de comentarios con filtrado automático de comentarios antiguos.
* Gestión de etiquetas compartidas entre múltiples publicaciones.
* Relación de seguidores y seguidos entre usuarios.

---

## 🛠️ Tecnologías

* Node.js
* Express.js
* MongoDB
* Mongoose
* Swagger UI
* dotenv

---

## 📂 Estructura del Proyecto

```text
src/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── swagger.yml
└── app.js
```

---

## ⚙️ Instalación

### Clonar repositorio

```bash
git clone https://github.com/EP-UnaHur-2026C1/anti-social-documental-tp-persistenciadeestrategia.git
cd anti-social-documental-tp-persistenciadeestrategia
```

### Instalar dependencias

```bash
npm install
```

### Configurar variables de entorno

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/anti-social-documental
LIMIT_MONTHS=6
```

### Ejecutar proyecto

```bash
npm run dev
```

* API: `http://localhost:3000`
* Swagger: `http://localhost:3000/api-docs`

---

## 🗄️ Decisiones de Persistencia

### Datos Embebidos

Las imágenes de las publicaciones se almacenan como subdocumentos dentro de cada post, evitando consultas adicionales.

### Datos Referenciados

Los comentarios y etiquetas se almacenan en colecciones independientes y se relacionan mediante `ObjectId`, permitiendo consultas más eficientes y documentos más livianos.

---

## 📌 Endpoints Principales

| Método | Ruta             | Descripción                  |
| ------ | ---------------- | ---------------------------- |
| POST   | `/api/users`     | Crear usuario                |
| GET    | `/api/users/:id` | Obtener usuario              |
| PUT    | `/api/users/:id` | Actualizar usuario           |
| DELETE | `/api/users/:id` | Eliminar usuario             |
| POST   | `/api/posts`     | Crear publicación            |
| GET    | `/api/posts`     | Listar publicaciones         |
| DELETE | `/api/posts/:id` | Eliminar publicación         |
| POST   | `/api/comments`  | Crear comentario             |
| GET    | `/api/comments`  | Obtener comentarios visibles |
| POST   | `/api/tags`      | Crear etiqueta               |

---

## 🎁 Puntos Bonus

### Sistema de Seguidores

Implementado mediante referencias entre documentos `User` utilizando los campos:

```javascript
followers: [ObjectId],
following: [ObjectId]
```

### Optimización Propuesta

Se propone incorporar **Redis** como capa de caché para almacenar publicaciones frecuentes y reducir consultas a MongoDB.

---

## 👨‍💻 Integrantes

* Estefania Abigail Almirón
* Sofía Agustina Gómez
* Gonzalo Martin Herlein
* Santiago Roberto Torales
* Thomas Vai

---

## 🎓 Universidad

**Universidad Nacional de Hurlingham (UNAHUR)**

**Materia:** Estrategias de Persistencia

**Año:** 2026
