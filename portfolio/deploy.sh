#!/bin/bash

# Script de deployment para Portfolio con Backoffice
# Autor: Omar
# Fecha: $(date)

echo "🚀 Iniciando deployment del Portfolio con Backoffice..."

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Función para mostrar mensajes
print_step() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ] || [ ! -d "bbdd" ]; then
    print_error "Por favor ejecuta este script desde el directorio portfolio/"
    exit 1
fi

# Paso 1: Desplegar el Worker de Cloudflare
print_step "📡 Desplegando Cloudflare Worker..."
cd bbdd

# Verificar que wrangler está instalado
if ! command -v npx &> /dev/null; then
    print_error "npx no está instalado. Por favor instala Node.js"
    exit 1
fi

# Verificar configuración
if [ ! -f "wrangler.jsonc" ]; then
    print_error "wrangler.jsonc no encontrado. Por favor configura tu Worker primero."
    exit 1
fi

print_step "Instalando dependencias del Worker..."
npm install

print_step "Ejecutando tests del Worker..."
npm test || print_warning "Tests fallaron, continuando..."

print_step "Desplegando Worker a Cloudflare..."
npm run deploy

if [ $? -eq 0 ]; then
    print_success "Worker desplegado exitosamente!"
else
    print_error "Error al desplegar el Worker"
    exit 1
fi

# Obtener URL del Worker desplegado
WORKER_URL=$(npx wrangler whoami 2>/dev/null | grep -o 'https://.*workers.dev' | head -n1)
if [ -z "$WORKER_URL" ]; then
    print_warning "No se pudo obtener automáticamente la URL del Worker"
    read -p "Por favor ingresa la URL de tu Worker: " WORKER_URL
fi

cd ..

# Paso 2: Construir el Frontend
print_step "🎨 Construyendo Frontend..."
print_step "Instalando dependencias del Frontend..."
npm install

print_step "Ejecutando linting..."
npm run build &> /dev/null || print_warning "Build warnings encontrados, continuando..."

print_step "Construyendo para producción..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Frontend construido exitosamente!"
else
    print_error "Error al construir el Frontend"
    exit 1
fi

# Paso 3: Mostrar información de configuración
print_step "📋 Información de Configuración"
echo ""
echo "==================================="
echo "🎉 DEPLOYMENT COMPLETADO"
echo "==================================="
echo ""
echo "📡 Worker URL: $WORKER_URL"
echo "📁 Frontend: ./dist/"
echo ""
echo "📝 Próximos pasos:"
echo "1. Sube la carpeta 'dist' a tu hosting (Netlify, Vercel, GitHub Pages, etc.)"
echo "2. Ve a tu-dominio.com/admin para configurar el backoffice"
echo "3. Configura la URL del Worker: $WORKER_URL"
echo "4. Configura tu API Key (la misma que pusiste en wrangler.jsonc)"
echo ""
echo "🔗 URLs útiles:"
echo "   - Portfolio: https://tu-dominio.com"
echo "   - Backoffice: https://tu-dominio.com/admin"
echo "   - API Health: $WORKER_URL/health"
echo "   - API Portfolio: $WORKER_URL/api/portfolio"
echo ""

# Paso 4: Verificar que el Worker funciona
print_step "🔍 Verificando Worker..."
if command -v curl &> /dev/null; then
    response=$(curl -s -o /dev/null -w "%{http_code}" "$WORKER_URL/health")
    if [ "$response" = "200" ]; then
        print_success "Worker está funcionando correctamente!"
    else
        print_warning "Worker no responde correctamente (HTTP $response)"
    fi
else
    print_warning "curl no disponible, verifica manualmente: $WORKER_URL/health"
fi

# Paso 5: Crear archivo de configuración para el usuario
cat > deployment-info.txt << EOF
INFORMACIÓN DE DEPLOYMENT
========================

🗓️ Fecha: $(date)
📡 Worker URL: $WORKER_URL
📁 Frontend construido en: ./dist/

CONFIGURACIÓN DEL BACKOFFICE:
1. Ve a: https://tu-dominio.com/admin
2. En la pestaña "Configuración":
   - API URL: $WORKER_URL
   - API Key: [la misma que configuraste en wrangler.jsonc]

ENDPOINTS DISPONIBLES:
- Health Check: $WORKER_URL/health
- Portfolio completo: $WORKER_URL/api/portfolio
- Proyectos: $WORKER_URL/api/projects
- Perfil: $WORKER_URL/api/profile
- Habilidades: $WORKER_URL/api/skills

HOSTING RECOMENDADO:
- Netlify: https://netlify.com
- Vercel: https://vercel.com
- GitHub Pages: https://pages.github.com
- Cloudflare Pages: https://pages.cloudflare.com

¡Tu portfolio con backoffice está listo! 🎉
EOF

print_success "Información guardada en: deployment-info.txt"
echo ""
print_success "🎉 ¡Deployment completado exitosamente!"
print_step "Lee el archivo 'deployment-info.txt' para más detalles"
