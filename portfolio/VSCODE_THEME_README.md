# 🎨 VS Code Themed Portfolio - Rediseño Completo

## ✨ Características Principales

### 1. **Layout tipo VS Code**
- **Activity Bar** (barra izquierda): Navegación principal con iconos
- **Sidebar**: Vista de explorador de archivos y control de fuente (git)
- **Editor Area**: Contenido principal con pestañas
- **Status Bar**: Barra de estado inferior con información
- **Panel**: Terminal integrada (opcional)

### 2. **Barra de Actividad (Activity Bar)**
- 📁 **Explorer**: Muestra la estructura de archivos del portfolio
- 🔍 **Search**: Búsqueda (preparado para expansión futura)
- 🔀 **Source Control**: Vista de proyectos como ramas Git
- 🧩 **Extensions**: Extensiones (preparado para expansión)
- 👤 **Account**: Cuenta de usuario
- 🌓 **Theme Toggle**: Cambio entre tema claro y oscuro
- ⚙️ **Settings**: Configuración

### 3. **Sidebar - Explorer View**
```
📂 PORTFOLIO
  📂 src
    📂 components
      📄 Home.tsx      → Página principal
      🔀 Projects.git  → Proyectos como Git branches
      📄 About.md      → Acerca de mí
      🖥️ Contact.sh    → Contacto como terminal
```

### 4. **Sidebar - Source Control View**
Los **proyectos se muestran como branches de Git**:
- 🌿 Cada proyecto es una "rama" (branch)
- 📊 Muestra estado: `active` (verde) o `merged` (gris)
- 📝 Commits simulados para cada proyecto
- 📅 Última actualización
- 🔗 Enlaces a GitHub y proyecto live
- 📦 Tecnologías como badges

**Vista expandible**:
- Al hacer clic en un proyecto, se expande mostrando:
  - Lista de tecnologías utilizadas
  - Commits recientes simulados
  - Información adicional

### 5. **Pestañas del Editor (Tabs)**
Cada página es una pestaña con su icono y extensión:
- `Home.tsx` - TypeScript/React icon
- `Projects.git` - Git icon
- `About.md` - Markdown icon
- `Contact.sh` - Terminal/Bash icon

### 6. **Breadcrumbs**
Navegación contextual que muestra:
```
📁 portfolio > src > Home.tsx
```

### 7. **Contenido de Páginas**

#### **Home.tsx** (Página Principal)
- Código JavaScript/TypeScript sintético que presenta al desarrollador
- Resaltado de sintaxis completo
- Números de línea a la izquierda
- Quick Actions con botones para navegar
- Footer con información Git-style

#### **Projects.git** (Proyectos como Git)
- Vista de tabla tipo GitHub
- Columnas: Branch, Status, Commits, Last Updated, Actions
- Estados visuales:
  - ✅ `merged`: Proyectos completados
  - 🟢 `active`: Proyectos en desarrollo
- Expansión para ver detalles
- Links a GitHub y demo live
- Tecnologías como badges de código

#### **Contact.sh** (Terminal Interactiva)
- Diseño completo de terminal
- Header con controles (rojo, amarillo, verde)
- Prompt de bash realista: `omar@portfolio:~$`
- Animación de escritura en tiempo real
- Métodos de contacto como "comandos"
- Información de ubicación y tiempo de respuesta
- Indicadores de estado activo/online
- Cursor parpadeante

### 8. **Status Bar (Barra de Estado)**
Información tipo VS Code:
- 🔀 Rama actual: `main`
- 🔄 Sincronización
- ⚠️ Warnings y errores (siempre en 0)
- 📍 Línea y columna
- ⚙️ Configuración (Spaces, UTF-8, Language)

### 9. **Temas**
- **Light Theme**: Fondo blanco con colores VS Code Light
- **Dark Theme**: Fondo oscuro (#1e1e1e) con colores VS Code Dark
- Transiciones suaves entre temas
- Todos los elementos respetan el tema

### 10. **Paleta de Colores (VS Code)**
```css
/* Variables de color auténticas de VS Code */
--vscode-bg: #ffffff / #1e1e1e
--vscode-sidebar-bg: #f3f3f3 / #252526
--vscode-activitybar-bg: #2c2c2c / #333333
--vscode-accent: #007acc
--vscode-git-added: #81b88b
--vscode-git-modified: #e2c08d
--vscode-git-deleted: #f48771
```

### 11. **Resaltado de Sintaxis**
Colores auténticos de VS Code para:
- `keywords`: #569cd6 (azul)
- `classes`: #4ec9b0 (turquesa)
- `strings`: #ce9178 (naranja)
- `comments`: #6a9955 (verde)
- `variables`: #9cdcfe (azul claro)
- `methods`: #dcdcaa (amarillo)

### 12. **Animaciones y Transiciones**
- ✨ Fade entre páginas
- 📂 Expansión suave de carpetas y secciones
- ⌨️ Efecto de escritura en terminal
- 💫 Hover states en todos los elementos interactivos
- 🔄 Rotación suave de iconos (chevrons)
- 📊 Animación de barras de progreso

### 13. **Responsive Design**
- 📱 Adaptado para móviles y tablets
- 🎯 Sidebar colapsable en pantallas pequeñas
- 📑 Tabs con scroll horizontal
- 🎨 Breakpoints: 768px, 480px

### 14. **Iconos SVG**
Todos los iconos son vectoriales y escalables:
- Estilo minimalista tipo Feather Icons
- Colores adaptativos según el tema
- Tamaños consistentes (16px, 24px)

## 🚀 Tecnologías Utilizadas

- **Vue 3** con Composition API
- **TypeScript** para type safety
- **Vue Router** para navegación
- **CSS Variables** para temas dinámicos
- **SVG Icons** custom hechos a medida

## 💡 Conceptos Creativos Aplicados

1. **Metáfora del Código**: Todo el portfolio es un "proyecto de código"
2. **Git como Narrativa**: Los proyectos son ramas de desarrollo
3. **Terminal Interactiva**: El contacto es una sesión de bash
4. **Estructura de Archivos**: La navegación es un explorador de archivos
5. **Código como Contenido**: El home es código JavaScript real

## 🎯 Experiencia de Usuario

- **Familiar para Developers**: Si usas VS Code, te sentirás como en casa
- **Intuitivo**: La metáfora del código es clara y consistente
- **Interactivo**: Expansión, hover states, animaciones
- **Profesional**: Diseño pulido y atención al detalle
- **Único**: No hay portfolios como este 🚀

## 📂 Estructura de Archivos Creados

```
src/
├── components/
│   ├── VSCodeLayout.vue          ← Layout principal
│   ├── ExplorerView.vue          ← Vista de explorador
│   ├── SourceControlView.vue     ← Vista de Git/Proyectos
│   ├── Projects.vue              ← Proyectos rediseñados
│   ├── Home.vue                  ← Home rediseñado
│   ├── Contact.vue               ← Contact rediseñado
│   └── icons/                    ← 17 iconos SVG custom
│       ├── IconExplorer.vue
│       ├── IconSourceControl.vue
│       ├── IconGitBranch.vue
│       ├── IconTerminal.vue
│       └── ... (13 más)
├── style.css                     ← Variables CSS de VS Code
└── App.vue                       ← Integración del layout

```

## 🎨 Características Pendientes (Expansión Futura)

- [ ] Command Palette (Ctrl+P) para navegación rápida
- [ ] Minimap lateral derecho
- [ ] Panel de Output con logs
- [ ] Extensiones interactivas
- [ ] Settings editables
- [ ] Git Graph visual
- [ ] Syntax highlighting en tiempo real
- [ ] Code snippets interactivos

---

**¡Tu portfolio ahora es un editor de código completo!** 🎉

El diseño es completamente funcional y está listo para usar. Cada detalle ha sido pensado para crear una experiencia única e inmersiva que refleja tu identidad como desarrollador.
