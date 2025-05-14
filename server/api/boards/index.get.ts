import { findBoardByUser } from "~~/server/utils/board"

export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event)
    const boards = await findBoardByUser(user.id, user.role, user.email)
    return boards
})
