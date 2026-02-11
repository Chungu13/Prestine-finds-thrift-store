# Production Deployment Script for Pristine Finds (Windows)
# This script handles the deployment of the application in production

Write-Host "🚀 Starting production deployment..." -ForegroundColor Green

# Check if .env files exist
if (-not (Test-Path "backend\.env")) {
    Write-Host "❌ Error: backend\.env not found. Please create it from backend\.env.example" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path "frontend\.env.local")) {
    Write-Host "❌ Error: frontend\.env.local not found. Please create it from frontend\.env.example" -ForegroundColor Red
    exit 1
}

# Pull latest changes (if using git)
Write-Host "📥 Pulling latest changes..." -ForegroundColor Cyan
try {
    git pull origin main
} catch {
    Write-Host "⚠️  Not a git repository or no remote configured" -ForegroundColor Yellow
}

# Build and start containers
Write-Host "🐳 Building and starting Docker containers..." -ForegroundColor Cyan
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# Wait for database to be ready
Write-Host "⏳ Waiting for database to be ready..." -ForegroundColor Cyan
Start-Sleep -Seconds 10

# Run migrations
Write-Host "🔄 Running database migrations..." -ForegroundColor Cyan
docker-compose -f docker-compose.prod.yml exec -T web python manage.py migrate

# Collect static files
Write-Host "📦 Collecting static files..." -ForegroundColor Cyan
docker-compose -f docker-compose.prod.yml exec -T web python manage.py collectstatic --noinput

# Show running containers
Write-Host "✅ Deployment complete! Running containers:" -ForegroundColor Green
docker-compose -f docker-compose.prod.yml ps

Write-Host ""
Write-Host "🌐 Application URLs:" -ForegroundColor Green
Write-Host "   Frontend: http://localhost:3000"
Write-Host "   Backend API: http://localhost:8000"
Write-Host "   GraphQL: http://localhost:8000/graphql/"
Write-Host ""
Write-Host "📝 To view logs, run:" -ForegroundColor Cyan
Write-Host "   docker-compose -f docker-compose.prod.yml logs -f"
