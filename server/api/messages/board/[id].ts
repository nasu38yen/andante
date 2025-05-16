import { findMessageByBoardId } from "~~/server/utils/message"

export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event)

    const id = getRouterParam(event, 'id')
    if (!id) {
        throw createError({ statusCode: 400, statusMessage: "Bad Request", message: "Missing board id" })
    }

    const board = await findBoardById(Number(id))
    if (!board) {
        throw createError({ statusCode: 400, statusMessage: "Bad Request", message: "Nothind data" })
    }

    // Check if the user is the author or a member of the board
    if (board.authorId !== user.id && !board.users?.includes(user.email)) {
        throw createError({ statusCode: 403, statusMessage: "Forbidden", message: "Not own" })
    }

    const messages = await findMessageByBoardId(Number(id))
    return messages
})
