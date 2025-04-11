import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  avatar: text('avatar'),
  githubId: integer('github_id').unique(),
  githubToken: text('github_token'),
  createdAt: text('created_at').notNull()
    .$defaultFn(() => sql`(current_timestamp)`),
  updatedAt: text('updated_at').notNull()
    .$defaultFn(() => sql`(current_timestamp)`)
    .$onUpdateFn(() => sql`(current_timestamp)`),
})


export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => sql`(current_timestamp)`),
  updatedAt: text('updated_at')
    .notNull()
    .$defaultFn(() => sql`(current_timestamp)`)
    .$onUpdateFn(() => sql`(current_timestamp)`),
})
