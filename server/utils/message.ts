import type { SQL } from 'drizzle-orm'
import { MessageInsert } from './drizzle'

export async function findMessageByBoardId(boardId: number) {
    return useDrizzle().select().from(tables.messages)
        .where(eq(tables.messages.boardId, boardId))
        .all()
}

export async function findMessageById(messageId: number) {
    return useDrizzle().select().from(tables.messages)
        .where(eq(tables.messages.id, messageId))
        .get()
}

export async function appendMessage(message: MessageInsert) {
    return useDrizzle().insert(tables.messages)
      .values(message)
      .returning().get()
}

export async function updateMessage(message: MessageInsert) {
    return useDrizzle().update(tables.messages).set({
        text: message.text,
        authorId: message.authorId,
        files: message.files,
      }).where(eq(tables.messages.id, message.id!)).returning().get()    
}
  
export async function deleteMessage(id: number) {
    const deleted = await useDrizzle().delete(tables.messages).where(and(
        eq(tables.messages.id, id)
      )).returning().get()
    return deleted
}
    

