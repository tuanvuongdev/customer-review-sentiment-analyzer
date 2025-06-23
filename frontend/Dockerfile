FROM node:18-slim

# Install basic dependencies
RUN apt-get update && apt-get install -y \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy frontend package files only
COPY frontend/package*.json ./

# Install frontend dependencies directly
RUN npm install

# Copy frontend source code
COPY frontend/ ./

EXPOSE 3000

# Run in development mode
ENV NEXT_TELEMETRY_DISABLED=1
CMD ["npm", "run", "dev"]