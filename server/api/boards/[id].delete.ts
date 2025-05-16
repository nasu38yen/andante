import { deleteBoard } from "~~/server/utils/board"
export default defineEventHandler(async (event) => {
    const { user } = await requireAdminSession(event)

    const { id } = getRouterParams(event)
    const numid = Number(id);

    const board = await findBoardById(numid)
    if (!board) {
        throw createError({ statusCode: 400, statusMessage: "Bad Request", message: "Nothind data" })
    }
    if (board.authorId !== user.id) {
        throw createError({ statusCode: 403, statusMessage: "Forbidden", message: "Not own" })
    }
    const deleted = await deleteBoard(numid)
    if (!deleted) {
        throw createError({ statusCode: 404, statusMessage: "Not Found", message: "Board not found" })
    }
    return deleted
})