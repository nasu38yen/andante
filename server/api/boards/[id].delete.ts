import { deleteBoard } from "~~/server/utils/board"
export default defineEventHandler(async (event) => {
    const { id } = getRouterParams(event)
    // if (!id) {
    //     throw createError({ statusCode: 400, statusMessage: "Bad Request", message: "Missing board id" })
    // }
    const numid = Number(id);
    const deleted = await deleteBoard(numid)
    if (!deleted) {
        throw createError({ statusCode: 404, statusMessage: "Not Found", message: "Board not found" })
    }
    return deleted
})