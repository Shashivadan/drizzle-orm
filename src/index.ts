import { sql } from "drizzle-orm";
import { db } from "./db/db";
import { UserPreferencesTable, usersTable } from "./db/schema";

async function main() {
  try {
  //  await  db.delete(usersTable);
  // const users = await db.insert(usersTable).values({ name: "wendigod" , age : 20 , email : "a@a.com" }).returning({id  : usersTable.id , name : usersTable.name});

    // const result = await db.query.usersTable.findFirst();
    await db
      .insert(UserPreferencesTable)
      .values({
        emailUpdatas: true,
        userId: "d0a54b7a-c56e-4607-be09-d318bba02225",
      });
    const users = await db.query.usersTable.findMany({
      columns : { email : true , name : true , id : true},
      extras : {lowerCaseName : sql<string>`lower(${usersTable.name})`.as("lowerCaseName")} ,
      with : { posts : true , performance : true}

    })
    console.log(users);
  } catch (error) {
    console.log(error);
  }
}

main();
