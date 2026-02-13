import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const dbUrl = process.env.DATABASE_URL || "file:./dev.db";
console.log(dbUrl);
// const db = new Database(dbUrl.replace("file:", ""));
console.log("Database connected");
// const adapter = new PrismaBetterSqlite3(db);
console.log("Adapter created");

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // adapter,
  });

console.log("Prisma client created");
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
