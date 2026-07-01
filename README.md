# 🚀 UnaHur Anti-Social Net - Backend API

Backend desarrollado para **UnaHur Anti-Social Net**, una red social implementada con **MongoDB**, **Mongoose** y **Redis**, siguiendo un modelo documental NoSQL con una capa de caché para optimizar el rendimiento.

La API permite gestionar usuarios, publicaciones, comentarios, etiquetas y relaciones de seguimiento, demostrando la aplicación práctica de distintas estrategias de persistencia.

---

# 📋 Funcionalidades

- 👤 **Gestión de Usuarios**
  - Registro de usuarios
  - Consulta
  - Actualización
  - Eliminación
  - Validación de datos mediante **Joi**

- 📝 **Publicaciones (Posts)**
  - Crear publicaciones
  - Obtener publicaciones
  - Editar publicaciones
  - Eliminar publicaciones

- 🖼️ **Manejo de Imágenes**
  - Subida de imágenes mediante **Multer**
  - Almacenamiento físico en `/uploads`
  - Referencias embebidas dentro de cada publicación

- 💬 **Sistema de Comentarios**
  - Crear comentarios
  - Obtener comentarios visibles
  - Filtro automático de antigüedad utilizando variables de entorno

- 🏷️ **Sistema de Etiquetas (Tags)**
  - Catálogo general de etiquetas
  - Asociación y desasociación de etiquetas a publicaciones

- 👥 **Sistema de Seguidores**
  - Seguir usuarios
  - Dejar de seguir usuarios

- ⚡ **Caché con Redis**
  - Almacenamiento temporal de publicaciones consultadas
  - Reducción de consultas repetitivas a MongoDB
  - Invalidación automática del caché cuando se modifican los datos

---

# 🛠️ Tecnologías

| Tecnología | Uso |
|------------|-----|
| Node.js | Entorno de ejecución |
| Express.js | Framework Web |
| MongoDB | Base de datos NoSQL |
| Mongoose | ODM |
| Redis | Caché en memoria |
| Joi | Validaciones |
| Multer | Subida de archivos |
| Swagger UI | Documentación de la API |
| Docker & Docker Compose | Contenedores |
| dotenv | Variables de entorno |

---

# 📂 Estructura del Proyecto

```text
src/
├── config/
│   ├── database.js
│   └── redis.js
├── controllers/
├── middlewares/
├── models/
├── routes/
├── uploads/
├── swagger.yaml
└── app.js
```

---

# ⚙️ Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/EP-UnaHur-2026C1/anti-social-documental-tp-persistenciadeestrategia.git

cd anti-social-documental-tp-persistenciadeestrategia
```

---

## 2. Instalar dependencias

```bash
npm install
```

---

## 3. Configurar las variables de entorno

Crear un archivo **`.env`** en la raíz del proyecto con el siguiente contenido:

```env
PORT=3000

MONGO_USER=admin
MONGO_PASSWORD=admin123
MONGO_PORT=27017

NODE_ENV=development

MONGO_URI=mongodb://admin:admin123@localhost:27017/anti-social?authSource=admin

REDIS_URI=redis://localhost:6379

LIMIT_MONTHS=6
```

---

## 4. Levantar MongoDB y Redis con Docker Compose

El proyecto utiliza **Docker Compose** para ejecutar automáticamente **MongoDB** y **Redis**.

Levantar los contenedores:

```bash
docker compose up -d
```

Verificar que estén ejecutándose:

```bash
docker ps
```

Deberían aparecer contenedores similares a:

```text
mongo
redis
```

Para detener los servicios:

```bash
docker compose down
```

---

## 5. Ejecutar la aplicación

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

---

# 🌐 Acceso

### API

```
http://localhost:3000
```

### Swagger

```
http://localhost:3000/api-docs
```

---

# 🗄️ Estrategias de Persistencia

## 📦 Datos Embebidos

Las imágenes pertenecen exclusivamente a una publicación, por lo que se almacenan como un arreglo de subdocumentos dentro del documento del post.

```javascript
images: [
  {
    url: String
  }
]
```

Esto evita consultas adicionales al recuperar una publicación.

---

## 🔗 Datos Referenciados

Los comentarios y las etiquetas se almacenan en colecciones independientes y se relacionan mediante `ObjectId`.

Esta estrategia permite:

- Reutilizar etiquetas entre publicaciones.
- Mantener documentos livianos.
- Mejorar el rendimiento de las consultas.
- Escalar el sistema con mayor facilidad.

---

## ⚡ Caché con Redis

Redis se ejecuta mediante **Docker Compose** y actúa como una capa de caché entre la API y MongoDB.

Flujo de funcionamiento:

```text
          Cliente
             │
             ▼
        Express API
             │
             ▼
    ¿Existe en Redis?
        │           │
       Sí          No
        │           │
        ▼           ▼
      Redis      MongoDB
        │           │
        └────► Redis ◄────┘
               │
               ▼
            Cliente
```

Beneficios:

- Menor tiempo de respuesta.
- Menor cantidad de consultas a MongoDB.
- Mejor escalabilidad.
- Invalidación automática del caché cuando una publicación es creada, modificada o eliminada.

---

# 📌 Endpoints Principales

## 👤 Usuarios

| Método | Ruta | Descripción |
|---------|------|-------------|
| POST | `/api/users` | Crear usuario |
| GET | `/api/users` | Obtener todos los usuarios |
| GET | `/api/users/:id` | Obtener un usuario |
| PUT | `/api/users/:id` | Actualizar un usuario |
| DELETE | `/api/users/:id` | Eliminar un usuario |

---

## 📝 Publicaciones

| Método | Ruta | Descripción |
|---------|------|-------------|
| POST | `/api/posts` | Crear publicación |
| GET | `/api/posts` | Obtener todas las publicaciones |
| GET | `/api/posts/:id` | Obtener una publicación |
| PUT | `/api/posts/:id` | Actualizar una publicación |
| DELETE | `/api/posts/:id` | Eliminar una publicación |

---

## 🖼️ Imágenes de Publicaciones

| Método | Ruta | Descripción |
|---------|------|-------------|
| POST | `/api/posts/:id/images` | Agregar imagen a una publicación |
| PUT | `/api/posts/:id/images/:imageId` | Actualizar una imagen |
| DELETE | `/api/posts/:id/images/:imageId` | Eliminar una imagen |

---

## 🏷️ Etiquetas

| Método | Ruta | Descripción |
|---------|------|-------------|
| GET | `/api/tags` | Obtener todas las etiquetas |
| GET | `/api/tags/:id` | Obtener una etiqueta |
| POST | `/api/tags` | Crear una etiqueta |
| PUT | `/api/tags/:id` | Actualizar una etiqueta |
| DELETE | `/api/tags/:id` | Eliminar una etiqueta |

---

## 🔗 Relación Post - Tags

| Método | Ruta | Descripción |
|---------|------|-------------|
| PUT | `/api/posts/:id/tags` | Reemplazar todas las etiquetas del post |
| POST | `/api/posts/:id/tags/:tagId` | Asociar una etiqueta |
| DELETE | `/api/posts/:id/tags/:tagId` | Desasociar una etiqueta |

---

## 💬 Comentarios

| Método | Ruta | Descripción |
|---------|------|-------------|
| GET | `/api/comments` | Obtener comentarios visibles |
| GET | `/api/comments/post/:postId` | Obtener comentarios de un post |
| POST | `/api/comments` | Crear comentario |
| PUT | `/api/comments/:id` | Actualizar comentario |
| DELETE | `/api/comments/:id` | Eliminar comentario |

---

## 👥 Seguidores

| Método | Ruta | Descripción |
|---------|------|-------------|
| POST | `/api/followers/:userId/:targetId` | Seguir usuario |
| DELETE | `/api/followers/:userId/:targetId` | Dejar de seguir usuario |
| GET | `/api/followers/:userId/followers` | Obtener seguidores |
| GET | `/api/followers/:userId/following` | Obtener seguidos |

> La documentación completa de todos los endpoints, parámetros, ejemplos y respuestas se encuentra disponible en **Swagger** en `http://localhost:3000/api-docs`.

# 🎁 Funcionalidades Destacadas

- ✅ Sistema de seguidores mediante referencias entre usuarios.
- ✅ Validación de datos con Joi.
- ✅ Documentación completa mediante Swagger.
- ✅ Subida de imágenes utilizando Multer.
- ✅ Persistencia documental con MongoDB y Mongoose.
- ✅ Caché de publicaciones mediante Redis.
- ✅ Contenedores Docker para MongoDB y Redis.

---

# 👨‍💻 Integrantes

- Estefania Abigail Almirón
- Sofía Agustina Gómez
- Gonzalo Martín Herlein
- Santiago Roberto Torales
- Thomas Vai

---

# 🎓 Universidad

**Universidad Nacional de Hurlingham (UNAHUR)**

**Materia:** Estrategias de Persistencia

**Año:** 2026
