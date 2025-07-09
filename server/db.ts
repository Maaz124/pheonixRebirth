import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Configure WebSocket for Neon serverless
neonConfig.webSocketConstructor = ws;
neonConfig.useSecureWebSocket = true;
neonConfig.pipelineConnect = false;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 20000,
  connectionTimeoutMillis: 5000,
  maxUses: 7500,
  allowExitOnIdle: false
});

// Add connection retry logic
const MAX_RETRIES = 3;
export const db = drizzle({ client: pool, schema });

// Test connection and retry if needed
export async function testConnection() {
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      await pool.query('SELECT 1');
      console.log('Database connection successful');
      return true;
    } catch (error) {
      console.log(`Connection attempt ${i + 1} failed:`, error.message);
      if (i === MAX_RETRIES - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
