#!/bin/sh
set -e

# Function to check database connection
wait_for_db() {
  echo "Waiting for database..."
}

echo "Starting deployment setup..."

# 1. Run Migrations (db:push)
# We retry this a few times because the DB might not be ready instantly
MAX_RETRIES=5
RETRY_COUNT=0

until npm run db:push; do
  RETRY_COUNT=$((RETRY_COUNT+1))
  if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
    echo "Failed to push schema after $MAX_RETRIES attempts. Exiting."
    exit 1
  fi
  echo "Database not ready yet... waiting 5s (Attempt $RETRY_COUNT/$MAX_RETRIES)"
  sleep 5
done

echo "✅ Database schema pushed successfully."

# 2. Run Seed
echo "🌱 Seeding database..."
node dist/seed.js || echo "⚠️  Seeding failed (might already be seeded). Continuing..."

# 3. Start Application
echo "🚀 Starting application..."
exec npm run start
