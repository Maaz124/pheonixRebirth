import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env with override to ensure local development settings take precedence
// over any stale shell environment variables
dotenv.config({
    path: path.resolve(__dirname, "../.env"),
    override: true
});

console.log("Environment variables loaded. DATABASE_URL is set to:", process.env.DATABASE_URL);
