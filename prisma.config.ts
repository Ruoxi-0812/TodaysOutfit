import path from "node:path";
import { defineConfig } from "prisma/config";

// Prisma CLI reads .env by default, not .env.local (Next.js convention).
// process.loadEnvFile is built into Node 20.12+ — no dotenv needed.
try {
  process.loadEnvFile(path.join(process.cwd(), ".env.local"));
} catch {
  // .env.local may not exist in all environments
}

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
