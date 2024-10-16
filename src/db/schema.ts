import { Relation, relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, real, uniqueIndex, uuid, varchar  , timestamp, primaryKey} from "drizzle-orm/pg-core";

export const UserRole = pgEnum("role", ["admin", "basic"])


export const usersTable = pgTable("users" , {
  id : uuid("id").defaultRandom().primaryKey(),
  name : varchar("name", { length : 255 }).notNull(),
  age : integer("age").notNull(),
  email : varchar("email", { length : 255 }).notNull().unique(),
  role : UserRole().default("basic").notNull(),
} , table => ({emailIndex : uniqueIndex("emailIndex").on(table.email)}))


export const UserPreferencesTable = pgTable("userPreferences" , {
  id : uuid("id").defaultRandom().primaryKey(),
  emailUpdatas : boolean("emailUpdatas").default(false).notNull(),
  userId : uuid("userId").references(() => usersTable.id).notNull()
})

export const postTable = pgTable("post", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  averageRating: real("averageRating").notNull().default(0),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  authoeId: uuid("userId").references(() => usersTable.id),

});


export const categoryTable = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
});


export const postCategoryTable = pgTable(
  "postCategory",
  {
    postId: uuid("postId").references(() => postTable.id),
    categoryId: uuid("categoryId").references(() => categoryTable.id),
  },
  (table) => ({ pk: primaryKey({ columns: [table.categoryId, table.postId] }) })
);


// RELATIONS


export const UserTableRelation = relations(usersTable , ({one , many}) => ({
  performance : one(UserPreferencesTable,  { fields : [usersTable.id] , references : [UserPreferencesTable.userId]}) ,
  posts : many(postTable)
}))


export const UserPreferencesTableRelaton = relations(
  UserPreferencesTable,
  ({ one}) => ({
    users: one(usersTable,  {
      fields : [UserPreferencesTable.userId],
      references : [usersTable.id]
    }),
  })
);


export const postsTableRelaton = relations(
  postTable,
  ({ one  , many}) => ({
    users: one(usersTable, {
      fields: [postTable.authoeId],
      references: [usersTable.id],
    }),
    category : many(categoryTable)
  })
);

export const categoryTableRelaton = relations(categoryTable , ({many}) => ({
  postCategory : many(postCategoryTable)
}))

export const postCategoryTableRelation = relations(postCategoryTable , ({one}) => ({
  posts : one(postTable , {
    fields : [postCategoryTable.postId],
    references : [postTable.id]
  }),
  category : one(categoryTable , { fields : [postCategoryTable.postId] , references : [categoryTable.id]})
}))
