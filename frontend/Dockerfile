FROM node:18-slim

# Install basic dependencies
RUN apt-get update && apt-get install -y \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy root package files (for workspaces)
COPY package*.json ./
# Copy workspace package files
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install all dependencies using workspaces
RUN npm ci

# Copy frontend source code
COPY frontend/ ./frontend/

EXPOSE 3000

# Run in development mode
ENV NEXT_TELEMETRY_DISABLED=1
CMD ["npm", "run", "dev:frontend"]