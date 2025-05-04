import { appendBoard, updateBoard } from "~~/server/utils/board"

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { id, name } = await readBody(event)

  if (id > 0) {
    const board = await updateBoard({
      id: id,
      name: name,
      authorId: user.id,
    })
    return board
  }

  const board = await appendBoard({
    name: name,
    authorId: user.id,
  })
  return board
})
