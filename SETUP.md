# Sentiment Analyzer - Setup Guide

Simple setup instructions for the Sentiment Analyzer project.

## 🔧 Prerequisites

**For Local Development:**

- Node.js 18+
- npm

**For Docker:**

- Docker
- Docker Compose

## 🚀 Quick Start

### Local Development

```bash
# 1. Clone and setup
git clone <repository-url>
cd sentiment-analyzer
./setup.sh

# 2. Start development servers
./start-dev.sh
```

### Docker (Development)

```bash
# 1. Clone and start
git clone <repository-url>
cd sentiment-analyzer
./docker-setup.sh
```

## 🌐 URLs

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:3056
- **Health Check:** http://localhost:3056/health

## 🔧 Development Commands

### Local

```bash
# Start both services
./start-dev.sh

# Start individually
cd backend && npm run dev
cd frontend && npm run dev

# Run tests
cd backend && npm test

# View database
cd backend && npx prisma studio
```

### Docker

```bash
# Start development environment
./docker-setup.sh

# Clean rebuild
./docker-setup.sh --clean

# Run tests
./docker-setup.sh --test

# View logs
docker compose logs -f

# Stop services
docker compose down
```

## 🛠️ Troubleshooting

**Port already in use:**

```bash
lsof -ti:3000 | xargs kill -9
lsof -ti:3056 | xargs kill -9
```

**Reset database:**

```bash
cd backend
npx prisma migrate reset
npx prisma generate
```

**Clean Docker:**

```bash
./docker-setup.sh --clean
```

That's it! Keep it simple. 🚀
