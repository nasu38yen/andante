import type { SQL } from 'drizzle-orm'
import type { UserInsert } from '~~/server/utils/drizzle'

export async function findUserByEmail(email: string) {
  return useDrizzle()
    .select()
    .from(tables.users)
    .where(eq(tables.users.email, email))
    .get()
}
