import { int, text, timestamp, varchar, mysqlTable, mysqlEnum } from "drizzle-orm/mysql-core";

// เพิ่มตารางโพสต์
export const posts = mysqlTable("posts", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  authorId: int("author_id").references(() => users.id),
  category: varchar("category", { length: 50 }).default("General"),
  createdAt: timestamp("created_at").defaultNow(),
});

// เพิ่มตารางแชท AI
export const aiMessages = mysqlTable("ai_messages", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").references(() => users.id),
  role: mysqlEnum("role", ["user", "assistant"]),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
