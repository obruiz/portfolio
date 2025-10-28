# Script de deployment para Portfolio con Backoffice (Windows PowerShell)
# Autor: Omar
# Fecha: Get-Date

Write-Host "🚀 Iniciando deployment del Portfolio con Backoffice..." -ForegroundColor Blue

# Función para mostrar mensajes con colores
function Write-Step {
    param($Message)
    Write-Host "[INFO] $Message" -ForegroundColor Cyan
}

function Write-Success {
    param($Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param($Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param($Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Verificar que estamos en el directorio correcto
if (-not (Test-Path "package.json") -or -not (Test-Path "bbdd")) {
    Write-Error "Por favor ejecuta este script desde el directorio portfolio/"
    exit 1
}

# Paso 1: Desplegar el Worker de Cloudflare
Write-Step "📡 Desplegando Cloudflare Worker..."
Set-Location bbdd

# Verificar que node está instalado
try {
    $nodeVersion = node --version
    Write-Step "Node.js version: $nodeVersion"
} catch {
    Write-Error "Node.js no está instalado. Por favor instala Node.js"
    exit 1
}

# Verificar configuración
if (-not (Test-Path "wrangler.jsonc")) {
    Write-Error "wrangler.jsonc no encontrado. Por favor configura tu Worker primero."
    exit 1
}

Write-Step "Instalando dependencias del Worker..."
npm install

Write-Step "Ejecutando tests del Worker..."
try {
    npm test
} catch {
    Write-Warning "Tests fallaron, continuando..."
}

Write-Step "Desplegando Worker a Cloudflare..."
try {
    npm run deploy
    Write-Success "Worker desplegado exitosamente!"
} catch {
    Write-Error "Error al desplegar el Worker"
    exit 1
}

# Obtener información del worker
$workerName = (Get-Content "wrangler.jsonc" | ConvertFrom-Json).name
$workerUrl = "https://$workerName.tu-usuario.workers.dev"

Set-Location ..

# Paso 2: Construir el Frontend
Write-Step "🎨 Construyendo Frontend..."
Write-Step "Instalando dependencias del Frontend..."
npm install

Write-Step "Construyendo para producción..."
try {
    npm run build
    Write-Success "Frontend construido exitosamente!"
} catch {
    Write-Error "Error al construir el Frontend"
    exit 1
}

# Paso 3: Mostrar información de configuración
Write-Step "📋 Información de Configuración"
Write-Host ""
Write-Host "===================================" -ForegroundColor Magenta
Write-Host "🎉 DEPLOYMENT COMPLETADO" -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Magenta
Write-Host ""
Write-Host "📡 Worker URL: $workerUrl" -ForegroundColor Yellow
Write-Host "📁 Frontend: .\dist\" -ForegroundColor Yellow
Write-Host ""
Write-Host "📝 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Sube la carpeta 'dist' a tu hosting (Netlify, Vercel, GitHub Pages, etc.)"
Write-Host "2. Ve a tu-dominio.com/admin para configurar el backoffice"
Write-Host "3. Configura la URL del Worker: $workerUrl"
Write-Host "4. Configura tu API Key (la misma que pusiste en wrangler.jsonc)"
Write-Host ""
Write-Host "🔗 URLs útiles:" -ForegroundColor Cyan
Write-Host "   - Portfolio: https://tu-dominio.com"
Write-Host "   - Backoffice: https://tu-dominio.com/admin"
Write-Host "   - API Health: $workerUrl/health"
Write-Host "   - API Portfolio: $workerUrl/api/portfolio"
Write-Host ""

# Paso 4: Verificar que el Worker funciona
Write-Step "🔍 Verificando Worker..."
try {
    $response = Invoke-WebRequest -Uri "$workerUrl/health" -Method Get -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Success "Worker está funcionando correctamente!"
    } else {
        Write-Warning "Worker no responde correctamente (HTTP $($response.StatusCode))"
    }
} catch {
    Write-Warning "No se pudo verificar el Worker automáticamente. Verifica manualmente: $workerUrl/health"
}

# Paso 5: Crear archivo de configuración para el usuario
$deploymentInfo = @"
INFORMACIÓN DE DEPLOYMENT
========================

🗓️ Fecha: $(Get-Date)
📡 Worker URL: $workerUrl
📁 Frontend construido en: .\dist\

CONFIGURACIÓN DEL BACKOFFICE:
1. Ve a: https://tu-dominio.com/admin
2. En la pestaña "Configuración":
   - API URL: $workerUrl
   - API Key: [la misma que configuraste en wrangler.jsonc]

ENDPOINTS DISPONIBLES:
- Health Check: $workerUrl/health
- Portfolio completo: $workerUrl/api/portfolio
- Proyectos: $workerUrl/api/projects
- Perfil: $workerUrl/api/profile
- Habilidades: $workerUrl/api/skills

HOSTING RECOMENDADO:
- Netlify: https://netlify.com
- Vercel: https://vercel.com
- GitHub Pages: https://pages.github.com
- Cloudflare Pages: https://pages.cloudflare.com

¡Tu portfolio con backoffice está listo! 🎉
"@

$deploymentInfo | Out-File -FilePath "deployment-info.txt" -Encoding UTF8

Write-Success "Información guardada en: deployment-info.txt"
Write-Host ""
Write-Success "🎉 ¡Deployment completado exitosamente!"
Write-Step "Lee el archivo 'deployment-info.txt' para más detalles"
