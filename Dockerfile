# Stage 1: Builder
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Runner
FROM node:20-alpine AS runner

WORKDIR /app

# Create a non-root user
RUN addgroup -S phoenix && adduser -S phoenix -G phoenix

# Copy necessary files from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY database_data ./database_data
COPY drizzle.config.ts ./drizzle.config.ts
COPY shared ./shared

# Entrypoint script
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

# Change ownership to non-root user
RUN chown -R phoenix:phoenix /app

# Switch to non-root user
USER phoenix

# Expose the application port
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Start the application via entrypoint
ENTRYPOINT ["./docker-entrypoint.sh"]
