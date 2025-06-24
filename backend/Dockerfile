FROM node:18-slim

# Install basic dependencies
RUN apt-get update && apt-get install -y \
    sqlite3 \
    openssl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy backend package files only
COPY backend/package*.json ./

# Install backend dependencies directly
RUN npm install

# Copy backend source code
COPY backend/ ./

# Generate Prisma client
RUN npx prisma generate

EXPOSE 3056

# Run migrations and start development server
CMD ["sh", "-c", "npx prisma migrate dev --name init && npm run dev"]