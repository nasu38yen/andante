import { updateBoardTimestamp } from '~~/server/utils/board'
import { deleteMessage } from "~~/server/utils/message"

const deleteblobs = async (id: string) => {
    const { blobs } = await hubBlob().list({prefix: id})
    for (const blob of blobs) {
        await hubBlob().delete(blob.pathname)
    }
  }
  
export default defineEventHandler(async (event) => {
    const { id } = getRouterParams(event)
    // if (!id) {
    //     throw createError({ statusCode: 400, statusMessage: "Bad Request", message: "Missing board id" })
    // }
    await deleteblobs(id)
    
    const numid = Number(id);
    const deleted = await deleteMessage(numid)
    if (!deleted) {
        throw createError({ statusCode: 404, statusMessage: "Not Found", message: "Board not found" })
    }
    await updateBoardTimestamp(deleted.boardId!)
    return deleted
})