import path from "node:path";
import { defineConfig } from "prisma/config";

export default defineConfig({
  // Explicitly set schema path (defaults would also work)
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    // Migrate legacy package.json#prisma.seed
    seed: "tsx prisma/seed.ts",
  },
});
