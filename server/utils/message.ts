import type { SQL } from 'drizzle-orm'
import { MessageInsert } from './drizzle'

export async function findMessageByBoardId(boardId: number) {
    return useDrizzle().select().from(tables.messages)
        .where(eq(tables.messages.boardId, boardId))
        .all()
}

export async function appendMessage(message: MessageInsert) {
    return useDrizzle().insert(tables.messages)
      .values(message)
      .returning().get()
}

  

