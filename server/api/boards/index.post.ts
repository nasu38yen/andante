import { appendBoard, updateBoard } from "~~/server/utils/board"
import { requireAdminSession } from "~~/server/utils/session"

export default eventHandler(async (event) => {
  const { user } = await requireAdminSession(event)

  const { id, name, users } = await readBody(event)

  if (id > 0) {
    const board = await updateBoard({
      id: id,
      name: name,
      users: users,
      authorId: user.id,
    })
    return board
  }

  const board = await appendBoard({
    name: name,
    users: users,
    authorId: user.id,
  })
  return board
})
