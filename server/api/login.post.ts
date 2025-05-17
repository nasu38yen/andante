import { z } from 'zod'

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export default defineEventHandler(async (event) => {
    const { email, password } = await readValidatedBody(event, bodySchema.parse)
    const user = await findUserByEmail(email)
    if (user &&  password === user.password) {
        await setUserSession(event, {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role ? user.role : 'user',
                isAdmin: user.role === 'admin',
                avatar: user.avatar ? user.avatar : '/avatar/default.jpg'
            }
        })
        return {}
    }
    throw createError({
        statusCode: 401,
        message: 'Bad credentials'
    })
})