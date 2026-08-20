# Stage 1: Build & Dependencies
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Stage 2: Runtime image
FROM node:18-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=3000

# Copy installed node_modules from builder
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

# Copy application source
COPY src/ ./src/

# Expose port
EXPOSE 3000

# Health check inside Docker
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start server
CMD ["node", "src/server.js"]
