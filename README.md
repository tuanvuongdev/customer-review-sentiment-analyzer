# 📝 Sentiment Analyzer

A full-stack web application that analyzes the sentiment of customer reviews using natural language processing. The application provides a modern, responsive interface for submitting text reviews and viewing sentiment analysis results with confidence scores.

## ✨ Features

- **Real-time Sentiment Analysis**: Analyze text sentiment as POSITIVE, NEGATIVE, or NEUTRAL
- **Confidence Scoring**: Get detailed confidence scores for each sentiment category
- **Review History**: View previously analyzed reviews with pagination
- **Modern UI**: Clean, responsive interface built with Next.js and Tailwind CSS
- **RESTful API**: Well-structured backend API with comprehensive validation
- **Database Storage**: Persistent storage of all analyzed reviews
- **Docker Support**: Easy deployment with Docker containers
- **Test Coverage**: Comprehensive test suite for backend functionality

## 🛠️ Technology Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Axios** - HTTP client for API requests
- **Lucide React** - Icon library

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe server development
- **Prisma** - Next-generation ORM
- **SQLite** - Database (easily configurable to other databases)
- **Natural** - Natural language processing library
- **Zod** - Schema validation
- **Jest** - Testing framework

### DevOps & Tools

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **ESLint** - Code linting
- **Prisma Migrate** - Database migrations

## 📁 Project Structure

```
sentiment-analyzer/
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── repositories/    # Data access layer
│   │   ├── routes/          # API route definitions
│   │   ├── types/           # TypeScript type definitions
│   │   ├── helpers/         # Utility functions and validation
│   │   └── __tests__/       # Test files
│   ├── prisma/              # Database schema and migrations
│   ├── Dockerfile           # Backend container configuration
│   └── package.json         # Frontend workspace configuration
├── frontend/                # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App Router pages and components
│   │   ├── components/      # Reusable UI components
│   │   ├── apis/            # API client functions
│   │   ├── lib/             # Utility libraries
│   │   └── types/           # TypeScript type definitions
│   ├── Dockerfile           # Frontend container configuration
│   └── package.json         # Frontend workspace configuration
├── docker-compose.yml       # Multi-container setup
├── setup.sh                 # Development setup script
├── docker-setup.sh          # Docker development setup script
└── package.json             # Root workspace configuration
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **Docker** (optional, for containerized deployment)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/tuanvuongdev/customer-review-sentiment-analyzer.git
   cd sentiment-analyzer
   ```

2. **Run the setup script**

   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

   This will:

   - Install all dependencies for root, backend, and frontend
   - Generate Prisma client
   - Run database migrations

### Development

**Start both frontend and backend:**

```bash
npm run dev
```

**Start services individually:**

```bash
# Backend only (runs on http://localhost:3056)
npm run dev:backend

# Frontend only (runs on http://localhost:3000)
npm run dev:frontend
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3056
- **API Health Check**: http://localhost:3056/health

## 🐳 Docker Deployment - Using Docker Compose (Recommended)

### Automated Docker Setup

```bash
# Build and run using the setup script
chmod +x docker-setup.sh
./docker-setup.sh

# Clean up Docker resources
./docker-setup.sh --clean
```

### Manual Docker Setup

```bash
# Build and start containers manually
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Complete cleanup (remove containers, images, volumes)
docker-compose down --rmi all --volumes --remove-orphans
docker system prune -f
```

## 📚 API Documentation

### Base URL

- Development: `http://localhost:3056/api`
- Docker: `http://localhost:3056/api`

### Endpoints

#### 🔍 Analyze Sentiment

```http
POST /api/review/analyze
```

**Request Body:**

```json
{
  "text": "This product is amazing! I love it so much."
}
```

**Response:**

```json
{
  "message": "Review analyzed successfully",
  "statusCode": 201,
  "metadata": {
    "text": "This product is amazing! I love it so much.",
    "sentiment": "POSITIVE",
    "confidence": 0.85,
    "scores": {
      "positive": 0.85,
      "negative": 0.1,
      "neutral": 0.05
    }
  }
}
```

#### 📋 Get Reviews

```http
GET /api/review/reviews?page=1&limit=10
```

**Query Parameters:**

- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of reviews per page (default: 10)

**Response:**

```json
{
  "message": "Reviews fetched successfully",
  "statusCode": 200,
  "metadata": {
    "reviews": [
      {
        "text": "This product is amazing! I love it so much.",
        "sentiment": "POSITIVE",
        "confidence": 0.85,
        "scores": {
          "positive": 0.85,
          "negative": 0.1,
          "neutral": 0.05
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5
    }
  }
}
```

#### 🏥 Health Check

```http
GET /health
```

**Response:**

```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## 🧪 Testing

### Run Tests

```bash
# Run all backend tests
npm test

# Run tests with coverage
npm run test:backend
```

### Test Coverage

The backend includes comprehensive tests for:

- API endpoints
- Sentiment analysis logic
- Input validation
- Error handling

### Database Operations

```bash
# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Reset database (development only)
npx prisma migrate reset --workspace=backend
```

## 🔧 Development Scripts

### Root Level Scripts

```bash
npm run install:all        # Install dependencies for both services
npm run dev                # Start both services
npm run build              # Build both services
npm run start              # Start both services in production
npm run test               # Run backend tests
npm run setup              # Run setup script
npm run docker:build       # Build Docker containers
npm run docker:clean       # Clean Docker resources
```

### Backend Scripts

```bash
npm run dev:backend        # Start backend in development
npm run build:backend      # Build backend
npm run start:backend      # Start backend in production
npm run test:backend       # Run backend tests
```

### Frontend Scripts

```bash
npm run dev:frontend       # Start frontend in development
npm run build:frontend     # Build frontend
npm run start:frontend     # Start frontend in production
```
