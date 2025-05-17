import { findBoardById } from "~~/server/utils/board"

export default defineEventHandler(async (event) => {
    const { user } = await requireUserSession(event)

    const id = getRouterParam(event, 'id')
    if (!id) {
        throw createError({ statusCode: 400, statusMessage: "Bad Request", message: "Missing board id" })
    }
    const numid = Number(id);
    const board = await findBoardById(numid)
    if (!board) {
        throw createError({ statusCode: 400, statusMessage: "Bad Request", message: "Nothind data" })
    }
    if (board.authorId === user.id || board.users?.includes(user.email)) {
        return board
    }
    throw createError({ statusCode: 403, statusMessage: "Forbidden", message: "Not own" })
})