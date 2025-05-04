import { findMessageByBoardId } from "~~/server/utils/message"

export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event)

    const id = getRouterParam(event, 'id')
    if (!id) {
        throw createError({ statusCode: 400, statusMessage: "Bad Request", message: "Missing board id" })
    }
    const messages = await findMessageByBoardId(Number(id))
    return messages
})
