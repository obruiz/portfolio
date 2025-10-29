# 📚 API Documentation - Portfolio Backend

## 🌐 Base URL

```
https://bbdd.tu-usuario.workers.dev
```

## 🔐 Autenticación

Para endpoints que requieren autenticación (POST, PUT, DELETE), incluir el header:

```
Authorization: Bearer portfolio-admin-2024
```

> ⚠️ **Importante**: Cambia el API_KEY en `wrangler.jsonc` antes de desplegar a producción.

---

## 📋 Endpoints Disponibles

### 1. Health Check

**GET** `/` o `/health`

Verifica el estado del servicio.

**Response:**
```json
{
  "success": true,
  "data": {
    "service": "Portfolio API",
    "status": "healthy",
    "timestamp": "2025-10-28T10:30:00.000Z",
    "version": "1.0.0",
    "storage": "KV"
  }
}
```

---

### 2. Proyectos

#### Listar todos los proyectos

**GET** `/api/projects`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "abc123",
      "title": "Mi Proyecto",
      "description": "Descripción del proyecto",
      "image": "https://ejemplo.com/imagen.jpg",
      "projectUrl": "https://proyecto.com",
      "githubUrl": "https://github.com/usuario/repo",
      "technologies": ["React", "Node.js", "MongoDB"],
      "createdAt": "2025-10-28T10:00:00.000Z",
      "updatedAt": "2025-10-28T10:00:00.000Z"
    }
  ]
}
```

#### Crear un proyecto

**POST** `/api/projects`

**Headers:** `Authorization: Bearer portfolio-admin-2024`

**Body:**
```json
{
  "title": "Nuevo Proyecto",
  "description": "Descripción detallada",
  "image": "https://ejemplo.com/imagen.jpg",
  "projectUrl": "https://proyecto.com",
  "githubUrl": "https://github.com/usuario/repo",
  "technologies": ["Vue", "TypeScript", "Vite"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "xyz789",
    "title": "Nuevo Proyecto",
    "description": "Descripción detallada",
    "image": "https://ejemplo.com/imagen.jpg",
    "projectUrl": "https://proyecto.com",
    "githubUrl": "https://github.com/usuario/repo",
    "technologies": ["Vue", "TypeScript", "Vite"],
    "createdAt": "2025-10-28T11:00:00.000Z",
    "updatedAt": "2025-10-28T11:00:00.000Z"
  }
}
```

#### Actualizar un proyecto

**PUT** `/api/projects/:id`

**Headers:** `Authorization: Bearer portfolio-admin-2024`

**Body:** (todos los campos son opcionales)
```json
{
  "title": "Proyecto Actualizado",
  "description": "Nueva descripción",
  "technologies": ["React", "Next.js"]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "xyz789",
    "title": "Proyecto Actualizado",
    "description": "Nueva descripción",
    "image": "https://ejemplo.com/imagen.jpg",
    "projectUrl": "https://proyecto.com",
    "githubUrl": "https://github.com/usuario/repo",
    "technologies": ["React", "Next.js"],
    "createdAt": "2025-10-28T11:00:00.000Z",
    "updatedAt": "2025-10-28T11:30:00.000Z"
  }
}
```

#### Eliminar un proyecto

**DELETE** `/api/projects/:id`

**Headers:** `Authorization: Bearer portfolio-admin-2024`

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Proyecto eliminado exitosamente"
  }
}
```

---

### 3. Perfil

#### Obtener perfil

**GET** `/api/profile`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "fullName": "Juan Pérez",
    "title": "Full Stack Developer",
    "description": "Desarrollador apasionado por crear experiencias web increíbles",
    "email": "juan@ejemplo.com",
    "linkedin": "https://linkedin.com/in/juanperez",
    "updatedAt": "2025-10-28T10:00:00.000Z"
  }
}
```

#### Actualizar perfil

**PUT** `/api/profile`

**Headers:** `Authorization: Bearer portfolio-admin-2024`

**Body:** (todos los campos son opcionales)
```json
{
  "fullName": "Juan Pérez García",
  "title": "Senior Full Stack Developer",
  "description": "Nueva descripción profesional",
  "email": "nuevo@email.com",
  "linkedin": "https://linkedin.com/in/nuevo-perfil"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "fullName": "Juan Pérez García",
    "title": "Senior Full Stack Developer",
    "description": "Nueva descripción profesional",
    "email": "nuevo@email.com",
    "linkedin": "https://linkedin.com/in/nuevo-perfil",
    "updatedAt": "2025-10-28T11:45:00.000Z"
  }
}
```

---

### 4. Habilidades

#### Listar todas las habilidades

**GET** `/api/skills`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "skill1",
      "name": "Vue.js",
      "level": 90,
      "createdAt": "2025-10-28T10:00:00.000Z"
    },
    {
      "id": "skill2",
      "name": "TypeScript",
      "level": 85,
      "createdAt": "2025-10-28T10:00:00.000Z"
    }
  ]
}
```

#### Crear una habilidad

**POST** `/api/skills`

**Headers:** `Authorization: Bearer portfolio-admin-2024`

**Body:**
```json
{
  "name": "React",
  "level": 95
}
```

**Validaciones:**
- `name` es obligatorio
- `level` debe estar entre 0 y 100

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "skill3",
    "name": "React",
    "level": 95,
    "createdAt": "2025-10-28T12:00:00.000Z"
  }
}
```

#### Eliminar una habilidad

**DELETE** `/api/skills/:id`

**Headers:** `Authorization: Bearer portfolio-admin-2024`

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Habilidad eliminada exitosamente"
  }
}
```

---

### 5. Portfolio Completo (Público)

#### Obtener todos los datos del portfolio

**GET** `/api/portfolio`

Este endpoint es **público** (no requiere autenticación) y devuelve todos los datos del portfolio de una sola vez.

**Response:**
```json
{
  "success": true,
  "data": {
    "profile": {
      "id": "1",
      "fullName": "Juan Pérez",
      "title": "Full Stack Developer",
      "description": "Desarrollador apasionado",
      "email": "juan@ejemplo.com",
      "linkedin": "https://linkedin.com/in/juanperez",
      "updatedAt": "2025-10-28T10:00:00.000Z"
    },
    "projects": [
      {
        "id": "abc123",
        "title": "Proyecto 1",
        "description": "Descripción",
        "image": "https://ejemplo.com/img.jpg",
        "projectUrl": "https://proyecto.com",
        "githubUrl": "https://github.com/usuario/repo",
        "technologies": ["React", "Node.js"],
        "createdAt": "2025-10-28T10:00:00.000Z",
        "updatedAt": "2025-10-28T10:00:00.000Z"
      }
    ],
    "skills": [
      {
        "id": "skill1",
        "name": "Vue.js",
        "level": 90,
        "createdAt": "2025-10-28T10:00:00.000Z"
      }
    ],
    "lastUpdated": "2025-10-28T12:30:00.000Z"
  }
}
```

---

## ❌ Códigos de Error

### 400 - Bad Request
Datos inválidos o faltantes en la petición.

```json
{
  "success": false,
  "error": "Título y descripción son obligatorios"
}
```

### 401 - Unauthorized
Falta el token de autenticación o es inválido.

```json
{
  "success": false,
  "error": "No autorizado"
}
```

### 404 - Not Found
Recurso no encontrado.

```json
{
  "success": false,
  "error": "Proyecto no encontrado"
}
```

### 405 - Method Not Allowed
Método HTTP no soportado para ese endpoint.

```json
{
  "success": false,
  "error": "Método no permitido"
}
```

### 500 - Internal Server Error
Error interno del servidor.

```json
{
  "success": false,
  "error": "Error interno del servidor"
}
```

---

## 🚀 Despliegue

### 1. Instalar dependencias
```bash
cd bbdd
npm install
```

### 2. Configurar el API Key
Edita `wrangler.jsonc` y cambia el valor de `API_KEY`:
```jsonc
"vars": {
  "API_KEY": "tu-clave-super-secreta-aqui"
}
```

### 3. Desarrollo local
```bash
npm run dev
```

Esto iniciará el worker en `http://localhost:8787`

### 4. Desplegar a producción
```bash
npm run deploy
```

---

## 🧪 Testing

### Probar el health check
```bash
curl https://bbdd.tu-usuario.workers.dev/health
```

### Crear un proyecto (con autenticación)
```bash
curl -X POST https://bbdd.tu-usuario.workers.dev/api/projects \
  -H "Authorization: Bearer portfolio-admin-2024" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mi Proyecto",
    "description": "Descripción del proyecto",
    "image": "https://ejemplo.com/imagen.jpg",
    "projectUrl": "https://proyecto.com",
    "githubUrl": "https://github.com/usuario/repo",
    "technologies": ["Vue", "TypeScript"]
  }'
```

### Listar proyectos (público)
```bash
curl https://bbdd.tu-usuario.workers.dev/api/projects
```

---

## 💾 Almacenamiento

La API usa **Cloudflare KV** para persistencia de datos:

- `portfolio:projects` - Array de proyectos
- `portfolio:profile` - Objeto de perfil
- `portfolio:skills` - Array de habilidades

### Datos por defecto

Al iniciar por primera vez, se crean automáticamente:
- Perfil con datos de ejemplo
- Arrays vacíos para proyectos y habilidades

---

## 🔒 Seguridad

### Recomendaciones:

1. **Cambiar el API_KEY** antes de desplegar
2. **Usar HTTPS** siempre (Cloudflare lo hace por defecto)
3. **No compartir** el API_KEY públicamente
4. **Considerar** usar Cloudflare Access para mayor seguridad
5. **Implementar** rate limiting si es necesario

### Variables de entorno sensibles:

Para producción, usa secrets en lugar de vars:

```bash
wrangler secret put API_KEY
# Ingresa tu clave cuando se te pida
```

Y actualiza el código para leer desde `env.API_KEY` (ya implementado).

---

## 📊 CORS

Todos los endpoints tienen CORS habilitado con:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Authorization`

---

## 🎯 Próximas Mejoras

- [ ] Paginación para proyectos
- [ ] Upload de imágenes directo al Worker
- [ ] Búsqueda y filtrado de proyectos
- [ ] Rate limiting
- [ ] Logs y analytics
- [ ] Backup automático
- [ ] Validación con Zod
- [ ] Tests unitarios

---

## 📞 Soporte

Si encuentras algún problema o tienes dudas, revisa:
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
- [KV Storage Docs](https://developers.cloudflare.com/kv/)
