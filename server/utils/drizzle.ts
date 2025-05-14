import { drizzle } from 'drizzle-orm/d1'

import * as schema from '../database/schema'

export { sql, eq, and, or, isNull, like, desc } from 'drizzle-orm'

export const tables = schema

export function useDrizzle() {
  return drizzle(hubDatabase(), { schema })
}

export type User = typeof schema.users.$inferSelect
export type UserInsert = typeof schema.users.$inferInsert

export type Board = typeof schema.boards.$inferSelect
export type BoardInsert = typeof schema.boards.$inferInsert

export type Message = typeof schema.messages.$inferSelect
export type MessageInsert = typeof schema.messages.$inferInsert
