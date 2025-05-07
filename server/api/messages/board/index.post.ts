import { appendMessage } from "~~/server/utils/message"

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { id, text, boardId } = await readBody(event)
  
  if (id > 0) {
    const message = await updateMessage({
      id: id,
      text: text,
      authorId: user.id,
    })
    return message
  }

  const message = await appendMessage({
    text: text,
    boardId: boardId,
    authorId: user.id,
  })
  return message
})
