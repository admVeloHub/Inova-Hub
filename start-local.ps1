# VeloHub V3 - Script de Inicialização Local
# Inicia Backend (porta 8090) e Frontend (porta 8080)

Write-Host "🚀 Iniciando VeloHub V3 Localmente..." -ForegroundColor Green
Write-Host ""

# Verificar se as dependências estão instaladas
if (-not (Test-Path "node_modules")) {
    Write-Host "⚠️  Instalando dependências do frontend..." -ForegroundColor Yellow
    npm install
}

if (-not (Test-Path "backend\node_modules")) {
    Write-Host "⚠️  Instalando dependências do backend..." -ForegroundColor Yellow
    cd backend
    npm install
    cd ..
}

Write-Host ""
Write-Host "📦 Dependências verificadas!" -ForegroundColor Green
Write-Host ""
Write-Host "🔧 Iniciando Backend na porta 8090..." -ForegroundColor Cyan
Write-Host "🌐 Iniciando Frontend na porta 8080..." -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Abra dois terminais:" -ForegroundColor Yellow
Write-Host "   1. Terminal 1: cd backend && npm start" -ForegroundColor White
Write-Host "   2. Terminal 2: npm start" -ForegroundColor White
Write-Host ""
Write-Host "Ou use o comando abaixo para iniciar o backend em background:" -ForegroundColor Yellow
Write-Host ""

# Iniciar backend em background
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host '🔧 Backend iniciando na porta 8090...' -ForegroundColor Cyan; npm start"

# Aguardar um pouco antes de iniciar o frontend
Start-Sleep -Seconds 3

# Iniciar frontend
Write-Host "🌐 Iniciando Frontend..." -ForegroundColor Cyan
$env:PORT = "8080"
npm start

