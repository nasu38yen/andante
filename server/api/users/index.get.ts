import { findAllUsers } from "~~/server/utils/user"

export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event)
    const users = await findAllUsers()
    return users
})
