export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { pathname } = event.context.params || {}

  // 板ユーザーの権限チェック
  const messageId = pathname.split('/')[0]
  const message = await findMessageById(Number(messageId))
  if (!message) {
      throw createError({ statusCode: 400, statusMessage: "Bad Request", message: "Nothind data" })
  }
  const board = await findBoardById(message.boardId!)
  if (!board) {
      throw createError({ statusCode: 400, statusMessage: "Bad Request", message: "Nothind data" })
  }
  if (board.authorId !== user.id && !board.users?.includes(user.email)) {
      throw createError({ statusCode: 403, statusMessage: "Forbidden", message: "Not own" })
  }

  setHeader(event, 'Content-Security-Policy', 'default-src \'none\';')
  return hubBlob().serve(event, pathname)
})
