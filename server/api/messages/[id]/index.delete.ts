import { updateBoardTimestamp } from '~~/server/utils/board'
import { deleteMessage } from "~~/server/utils/message"

const deleteblobs = async (id: string) => {
    const { blobs } = await hubBlob().list({prefix: id})
    for (const blob of blobs) {
        await hubBlob().delete(blob.pathname)
    }
  }
  
export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event)
    const { id } = getRouterParams(event)
    
    // 投稿者以外はアップロードできない
    const message = await findMessageById(Number(id))
    if (message?.authorId !== user.id) {
      throw createError({ statusCode: 400, statusMessage: "Bad Request", message: "Not owner" })
    }

    await deleteblobs(id)
    
    const numid = Number(id);
    const deleted = await deleteMessage(numid)
    if (!deleted) {
        throw createError({ statusCode: 404, statusMessage: "Not Found", message: "Message not found" })
    }
    await updateBoardTimestamp(deleted.boardId!)
    return deleted
})