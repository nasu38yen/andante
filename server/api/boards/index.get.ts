import { findBoardByUserId } from "~~/server/utils/board"

export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event)
    const boards = await findBoardByUserId(user.id)
    return boards
})
