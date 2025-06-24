echo "🚀 Setting up Sentiment Analyzer project..."

# Install all dependencies
echo "📦 Installing root, backend & frontend dependencies..."
npm run install:all

# Copy environment files
echo "🔧 Setting up environment files..."
if [ -f "backend/.env.example" ]; then
    cp backend/.env.example backend/.env
    echo "  ✓ Copied backend/.env.example to backend/.env"
else
    echo "  ⚠️  backend/.env.example not found"
fi

if [ -f "frontend/.env.example" ]; then
    cp frontend/.env.example frontend/.env
    echo "  ✓ Copied frontend/.env.example to frontend/.env"
else
    echo "  ⚠️  frontend/.env.example not found"
fi

# Generate Prisma client and run migrations
echo "🗄️  Setting up database..."
npm run prisma:generate
npm run prisma:migrate

echo "✅ Setup complete!"
echo ""
echo "🔧 To start development:"
echo "  npm run dev              # Start both frontend and backend"
echo "  npm run dev:backend      # Start backend only"
echo "  npm run dev:frontend     # Start frontend only"
echo ""
echo "🧪 To run tests:"
echo "  npm test                 # Run backend tests"
echo ""
echo "🌐 URLs:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:3056"
echo "  Health:   http://localhost:3056/health"