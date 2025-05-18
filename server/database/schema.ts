import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { DateTime } from 'luxon'

const timestamps = {
  createdAt: text('created_at').notNull()
    .$defaultFn(() => DateTime.utc().setZone('Asia/Tokyo').toFormat('yyyy/MM/dd HH:mm:ss')),
  updatedAt: text('updated_at')
    .$defaultFn(() => DateTime.utc().setZone('Asia/Tokyo').toFormat('yyyy/MM/dd HH:mm:ss'))
    .$onUpdateFn(() => DateTime.utc().setZone('Asia/Tokyo').toFormat('yyyy/MM/dd HH:mm:ss')),
}

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role'),
  avatar: text('avatar'),
  githubId: integer('github_id').unique(),
  githubToken: text('github_token'),
  verifiedAt: text('verified_at'),
  ...timestamps
})

export const boards = sqliteTable('boards', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  authorId: integer("author_id").references(() => users.id),
  users: text('users'),
  ...timestamps
})

export const messages = sqliteTable('messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  text: text('text').notNull(),
  authorId: integer("author_id").references(() => users.id),
  boardId: integer("board_id").references(() => boards.id),
  files: text('files'),
  ...timestamps
})
