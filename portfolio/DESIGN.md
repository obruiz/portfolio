# Diseño del Portfolio

## Inspiración
Este portfolio está inspirado en el diseño minimalista de [p5aholic.me](https://p5aholic.me/info/), con un enfoque en:
- Simplicidad y claridad
- Tipografía limpia
- Espaciado generoso
- Mínimo uso de color (con accent color azul)
- Navegación intuitiva

## Características

### Modo Oscuro/Claro
- Switch entre modo claro (fondo blanco) y oscuro (fondo negro)
- Persistencia en localStorage
- Transiciones suaves

### Modo Monoespaciado
- Opción de cambiar la fuente a monoespaciada (estilo terminal)
- Inspirado en el diseño original de referencia

### Layout
- Header fijo con navegación minimalista
- Controles de tema y fuente en el header
- Footer con links sociales
- Contenido centrado con max-width de 800px
- Responsive design

### Páginas
1. **Home**: Presentación simple con nombre, rol y descripción
2. **Projects**: Lista de proyectos con año, tecnologías y links
3. **Info**: Experiencia profesional y proyectos destacados
4. **Contact**: Links de contacto y ubicación

## Colores
- **Light mode**: Fondo blanco (#ffffff), texto oscuro (#1a1a1a)
- **Dark mode**: Fondo negro (#0a0a0a), texto claro (#e8e8e8)
- **Accent**: Azul (#3b82f6)
- **Borders**: Grises sutiles

## Tipografía
- **Normal**: System fonts (-apple-system, BlinkMacSystemFont, Segoe UI, etc.)
- **Monoespaciada**: Courier New (opcional)
- Tamaños responsivos con clamp()

## Interacciones
- Hover suaves en links
- Underline animado en navegación activa
- Transiciones rápidas (0.2s-0.3s)
- Sin animaciones excesivas

## Estructura de Archivos
```
src/
├── App.vue (Layout principal con tema)
├── style.css (Estilos globales y variables)
├── components/
│   ├── Header.vue (Navegación + controles)
│   ├── Footer.vue (Links sociales)
│   ├── Home.vue (Página de inicio)
│   ├── Projects.vue (Lista de proyectos)
│   ├── AboutMe.vue (Info personal)
│   └── Contact.vue (Contacto)
└── router/
    └── index.ts (Rutas)
```

## Mejoras Futuras
- [ ] Añadir animaciones sutiles de entrada
- [ ] Mejorar transiciones entre páginas
- [ ] Añadir modo de alto contraste
- [ ] Implementar keyboard navigation
- [ ] Añadir más opciones de personalización
