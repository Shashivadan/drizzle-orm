import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";


const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect();

import * as schema from "./schema";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import path from "node:path";
async function main() {
  try {
    const db = drizzle(client, {
      schema,
    });

    await migrate(db, {
      migrationsFolder: path.join(process.cwd(), "src/db/migration"),
    });
    console.log("🎉 Database migration successfully!");
  } catch (error) {
    console.error("❌ Database migration failed:\n", error);
  } finally {
    client.end();
  }
}
main();
