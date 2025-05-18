import type { SQL } from 'drizzle-orm'
import { BoardInsert, like, desc } from './drizzle'
  
export async function findBoardAll() {
    return useDrizzle().select().from(tables.boards).all()
}

export async function findBoardBy(query: SQL | undefined) {
    return useDrizzle().select().from(tables.boards).where(query).get()
}
  
export async function findBoardByUser(id: number, role: string, email: string) {
    const conditions: SQL[] = [];
    if (role === 'admin') {
        conditions.push(eq(tables.boards.authorId, id))
    }
    conditions.push(like(tables.boards.users, `%${email}%`))

    return useDrizzle().select().from(tables.boards)
        .where(or(...conditions))
        .orderBy(desc(tables.boards.updatedAt))
        .all()
}
  
export async function findBoardById(id: number) {
    return useDrizzle().select().from(tables.boards)
        .where(eq(tables.boards.id, id))
        .get()
}

export async function appendBoard(board: BoardInsert) {
    return useDrizzle().insert(tables.boards)
      .values(board)
      .returning().get()
}

export async function updateBoard(board: BoardInsert) {
    return useDrizzle().update(tables.boards).set({
        name: board.name,
        users: board.users,
        authorId: board.authorId,
      }).where(eq(tables.boards.id, board.id!)).returning().get()    
}

import { DateTime } from 'luxon'
export async function updateBoardTimestamp(boardId: number) {
    return useDrizzle().update(tables.boards).set({
        updatedAt: DateTime.utc().setZone('Asia/Tokyo').toFormat('yyyy/MM/dd HH:mm:ss')
      }).where(eq(tables.boards.id, boardId!)).returning().get()    
}
  
export async function deleteBoard(id: number) {
    const deleted = await useDrizzle().delete(tables.boards).where(and(
        eq(tables.boards.id, id)
      )).returning().get()
    return deleted
}
  
  