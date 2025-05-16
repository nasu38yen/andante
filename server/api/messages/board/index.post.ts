
import { appendMessage, updateMessage } from '~~/server/utils/message'
import { updateBoardTimestamp } from '~~/server/utils/board'

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { id, text, boardId, files } = await readBody(event)

  // 板ユーザーの権限チェック
  const board = await findBoardById(Number(boardId))
  if (!board) {
      throw createError({ statusCode: 400, statusMessage: "Bad Request", message: "Nothind data" })
  }
  if (board.authorId !== user.id && !board.users?.includes(user.email)) {
      throw createError({ statusCode: 403, statusMessage: "Forbidden", message: "Not own" })
  }
  
  if (id > 0) {
    const message = await updateMessage({
      id: id,
      text: text,
      files: files,
      authorId: user.id,
    })
    await files2blob(files, id, text)
    await updateBoardTimestamp(boardId)
    return message
  }

  const message = await appendMessage({
    text: text,
    boardId: boardId,
    authorId: user.id,
  })
  await updateBoardTimestamp(boardId)
  return message
})

// filesにないblobを削除する
const files2blob = async (filesText: string, id: number, text: string) => {
  const files = JSON.parse(filesText)
  const { blobs } = await hubBlob().list({prefix: id.toString()})
  for (const blob of blobs) {
    const blobname = blob.pathname.split('/').pop()
    if (!files.includes(blobname!)) {
      await hubBlob().delete(blob.pathname)
      // 画像リンクを削除
      const name = blobname?.split('.').shift()
      const linktext = `![${name}](/files/${blob.pathname})`
      text = text.replace(linktext, '')
    }
  }
  await useDrizzle().update(tables.messages).set({
    text: text,
  }).where(eq(tables.messages.id, id!))
}
