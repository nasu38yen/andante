import { appendMessage } from "~~/server/utils/message"

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { text, boardId } = await readBody(event)

  const message = await appendMessage({
    text: text,
    boardId: boardId,
    authorId: user.id,
  })
  return message
})
