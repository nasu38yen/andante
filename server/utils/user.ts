export async function findUserByEmail(email: string) {
  return useDrizzle()
    .select()
    .from(tables.users)
    .where(eq(tables.users.email, email))
    .get()
}

export async function findAllUsers() {
  return useDrizzle()
    .select()
    .from(tables.users)
    .all()
}

export async function updatePassword(id: number, password: string) {
    return useDrizzle().update(tables.users).set({
        password: password,
      }).where(eq(tables.users.id, id)).returning().get()    
}

export async function updateUser(userId: number, user: Partial<UserInsert>) {
  return useDrizzle()
    .update(tables.users)
    .set(user)
    .where(eq(tables.users.id, userId))
    .run()
}

