#!/bin/bash

# Production Deployment Script for Pristine Finds
# This script handles the deployment of the application in production

set -e  # Exit on error

echo "🚀 Starting production deployment..."

# Check if .env files exist
if [ ! -f backend/.env ]; then
    echo "❌ Error: backend/.env not found. Please create it from backend/.env.example"
    exit 1
fi

if [ ! -f frontend/.env.local ]; then
    echo "❌ Error: frontend/.env.local not found. Please create it from frontend/.env.example"
    exit 1
fi

# Pull latest changes (if using git)
echo "📥 Pulling latest changes..."
git pull origin main || echo "⚠️  Not a git repository or no remote configured"

# Build and start containers
echo "🐳 Building and starting Docker containers..."
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Run migrations
echo "🔄 Running database migrations..."
docker-compose -f docker-compose.prod.yml exec -T web python manage.py migrate

# Collect static files
echo "📦 Collecting static files..."
docker-compose -f docker-compose.prod.yml exec -T web python manage.py collectstatic --noinput

# Show running containers
echo "✅ Deployment complete! Running containers:"
docker-compose -f docker-compose.prod.yml ps

echo ""
echo "🌐 Application URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo "   GraphQL: http://localhost:8000/graphql/"
echo ""
echo "📝 To view logs, run:"
echo "   docker-compose -f docker-compose.prod.yml logs -f"
