FROM node:18-slim

# Install basic dependencies
RUN apt-get update && apt-get install -y \
    sqlite3 \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy root package files (for workspaces)
COPY package*.json ./
# Copy workspace package files
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/
COPY backend/prisma ./backend/prisma/

# Install all dependencies using workspaces
RUN npm ci

# Copy backend source code
COPY backend/ ./backend/

# Generate Prisma client using workspace command
RUN npm run prisma:generate

EXPOSE 3056

# Run in development mode
CMD ["npm", "run", "dev:backend"]