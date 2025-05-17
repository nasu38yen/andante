import { updateUser } from "~~/server/utils/user"

export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event)
    const { id, email, password1 } = await readBody(event)

    if (user.id !== id || user.email !== email) {
        throw createError({statusCode: 403, message: 'Not authorized' })
    }

    const urec = await findUserByEmail(user.email)
    if (!urec) {
        throw createError({statusCode: 404, message: 'User not found' })
    }

    await updateUser(user.id, password1)    
    await setUserSession(event, {
        user: {
            id: urec.id,
            name: urec.name,
            email: urec.email,
            role: urec.role ? user.role : 'user',
            isAdmin: urec.role === 'admin',
        }
    })
    return {}
})