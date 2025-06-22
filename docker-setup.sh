#!/bin/bash

echo "🐳 Setting up Sentiment Analyzer with Docker..."

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Handle command line arguments
case "$1" in
    --clean|-c)
        echo "🧹 Cleaning up and rebuilding..."
        docker compose down --rmi all --volumes --remove-orphans 2>/dev/null || true
        docker system prune -f 2>/dev/null || true
        echo "🔨 Building and starting development environment..."
        docker compose up -d --build
        ;;
    --test|-t)
        echo "🧪 Running tests..."
        docker compose run --rm backend npm test
        exit 0
        ;;
    --help|-h)
        echo "Docker Setup for Sentiment Analyzer (Development Only)"
        echo ""
        echo "Usage: $0 [OPTIONS]"
        echo ""
        echo "Options:"
        echo "  --clean, -c    Clean up and rebuild everything"
        echo "  --test, -t     Run tests only"
        echo "  --help, -h     Show this help"
        echo ""
        echo "Examples:"
        echo "  $0             # Start development environment"
        echo "  $0 --clean     # Clean rebuild"
        echo "  $0 --test      # Run tests"
        exit 0
        ;;
    *)
        echo "🔨 Starting development environment..."
        docker compose up -d
        ;;
esac

echo ""
echo "✅ Docker setup complete!"
echo ""
echo "🌐 URLs:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:3056"
echo "  Health:   http://localhost:3056/health"
echo ""
echo "🔧 Useful commands:"
echo "  docker compose logs -f          # View logs"
echo "  docker compose down             # Stop services"
echo "  docker compose restart          # Restart services"