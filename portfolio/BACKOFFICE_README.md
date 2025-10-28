# 🚀 Portfolio con Backoffice - Guía Completa

## 📋 Descripción

He creado un sistema completo de portfolio con backoffice que te permite gestionar todo tu contenido de forma dinámica. El sistema incluye:

- **Frontend**: Portfolio en Vue.js con Tailwind CSS
- **Backend**: API REST en Cloudflare Worker
- **Backoffice**: Panel de administración integrado
- **Storage**: KV Storage de Cloudflare para persistencia

## 🏗️ Arquitectura

```
📁 portfolio/
├── 📁 src/
│   ├── 📁 components/
│   │   ├── Admin.vue          # 🔧 Panel de administración
│   │   ├── Projects.vue       # 📂 Muestra proyectos del API
│   │   └── ...
│   ├── 📁 services/
│   │   └── api.ts            # 🌐 Servicio para conectar con el API
│   └── 📁 router/
│       └── index.ts          # 🛣️ Rutas (incluye /admin)
│
├── 📁 bbdd/ (Cloudflare Worker)
│   ├── 📁 src/
│   │   ├── index.ts          # 🎯 API principal
│   │   └── storage.ts        # 💾 Capa de almacenamiento
│   └── wrangler.jsonc        # ⚙️ Configuración del Worker
```

## 🎯 Endpoints del API

### Públicos
- `GET /api/portfolio` - Obtiene todos los datos del portfolio
- `GET /api/projects` - Lista todos los proyectos
- `GET /api/profile` - Información personal
- `GET /api/skills` - Lista de habilidades

### Privados (requieren autenticación)
- `POST /api/projects` - Crear proyecto
- `PUT /api/projects/:id` - Actualizar proyecto
- `DELETE /api/projects/:id` - Eliminar proyecto
- `PUT /api/profile` - Actualizar perfil
- `POST /api/skills` - Crear habilidad
- `DELETE /api/skills/:id` - Eliminar habilidad

## 🚀 Configuración y Despliegue

### 1. Configurar el Worker de Cloudflare

1. **Navegar al directorio del worker:**
   ```bash
   cd portfolio/bbdd
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Crear KV Namespace:**
   ```bash
   npx wrangler kv:namespace create "PORTFOLIO_KV"
   npx wrangler kv:namespace create "PORTFOLIO_KV" --preview
   ```

4. **Actualizar wrangler.jsonc:**
   ```json
   {
     "kv_namespaces": [
       {
         "binding": "PORTFOLIO_KV",
         "id": "tu-kv-namespace-id",
         "preview_id": "tu-preview-kv-namespace-id"
       }
     ],
     "vars": {
       "API_KEY": "tu-clave-api-secreta"
     }
   }
   ```

5. **Desarrollar localmente:**
   ```bash
   npm run dev
   ```

6. **Desplegar a producción:**
   ```bash
   npm run deploy
   ```

### 2. Configurar el Frontend

1. **Navegar al directorio principal:**
   ```bash
   cd portfolio
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Desarrollar localmente:**
   ```bash
   npm run dev
   ```

4. **Construir para producción:**
   ```bash
   npm run build
   ```

## 🔧 Uso del Backoffice

### Acceso
- **Desarrollo**: `http://localhost:5173/admin`
- **Producción**: `https://tu-dominio.com/admin`

### Configuración Inicial

1. **Ve a la pestaña "⚙️ Configuración"**
2. **Configura la URL del Worker:**
   ```
   https://bbdd.tu-usuario.workers.dev
   ```
3. **Configura tu clave API:**
   ```
   tu-clave-api-secreta
   ```
4. **Guarda la configuración**

### Gestión de Contenido

#### 📂 Proyectos
- **Crear**: Clic en "➕ Nuevo Proyecto"
- **Editar**: Clic en "✏️ Editar" en cualquier proyecto
- **Eliminar**: Clic en "🗑️ Eliminar" (con confirmación)

**Campos del proyecto:**
- Título del proyecto
- Descripción
- URL de la imagen
- URL del proyecto (sitio web)
- URL del repositorio (GitHub)
- Tecnologías (separadas por coma)

#### 👤 Perfil
- Nombre completo
- Título profesional
- Descripción personal
- Email de contacto
- Perfil de LinkedIn

#### 🛠️ Habilidades
- Nombre de la habilidad
- Nivel (0-100%)

## 🔐 Seguridad

### Autenticación
- El API usa Bearer Token para autenticación
- La clave API se configura en las variables de entorno del Worker
- Todas las operaciones de escritura requieren autenticación

### CORS
- Configurado para permitir todas las origins (`*`)
- Incluye headers necesarios para funcionamiento correcto

## 📊 Estructura de Datos

### Proyecto
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  projectUrl: string;
  githubUrl: string;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
}
```

### Perfil
```typescript
interface Profile {
  id: string;
  fullName: string;
  title: string;
  description: string;
  email: string;
  linkedin: string;
  updatedAt: string;
}
```

### Habilidad
```typescript
interface Skill {
  id: string;
  name: string;
  level: number;
  createdAt: string;
}
```

## 🎨 Características del Backoffice

### Diseño
- **Dark Theme**: Interfaz moderna en modo oscuro
- **Responsive**: Funciona en móviles y tablets
- **Animations**: Transiciones suaves y feedback visual
- **Icons**: Emojis para mejor UX

### Funcionalidades
- **Tabs Navigation**: Organización clara por secciones
- **Modal Forms**: Formularios en ventanas modales
- **Real-time Feedback**: Notificaciones de éxito/error
- **Auto-save Settings**: Configuración guardada en localStorage

### UX
- **Loading States**: Indicadores de carga
- **Error Handling**: Manejo elegante de errores
- **Confirmations**: Confirmaciones para acciones destructivas
- **Validation**: Validación de formularios

## 🔄 Flujo de Trabajo

1. **Configurar el Worker** y desplegarlo
2. **Configurar el backoffice** con la URL y API key
3. **Añadir tu información personal** en la sección Perfil
4. **Crear tus habilidades** con niveles apropiados
5. **Añadir tus proyectos** con imágenes y links
6. **El portfolio se actualiza automáticamente** usando los datos del API

## 🐛 Resolución de Problemas

### Error de CORS
- Verifica que el Worker esté funcionando
- Comprueba la URL del API en configuración

### Error de Autenticación
- Verifica que la API key esté correctamente configurada
- Asegúrate de que coincida con la del Worker

### No se cargan los datos
- Verifica la conectividad con el Worker
- Revisa la consola del navegador para errores
- Usa el endpoint `/health` para verificar el estado del API

## 📝 Próximos Pasos

### Mejoras Posibles
1. **Upload de imágenes**: Integración con Cloudflare Images
2. **Rich Text Editor**: Editor WYSIWYG para descripciones
3. **Analytics**: Métricas de visitas y rendimiento
4. **SEO**: Meta tags dinámicos basados en el contenido
5. **Themes**: Múltiples temas para el portfolio
6. **Multi-idioma**: Soporte para varios idiomas

### Escalabilidad
- **Database**: Migrar a D1 para queries más complejas
- **CDN**: Optimización de imágenes con Cloudflare Images
- **Cache**: Implementar estrategias de cache avanzadas
- **Auth**: Sistema de autenticación más robusto

¡Ya tienes un sistema completo de portfolio con backoffice funcional! 🎉
