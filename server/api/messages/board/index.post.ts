import { file } from "valibot"
import { appendMessage } from "~~/server/utils/message"

// filesにないblobを削除する
const files2blob = async (filesText: string, id: number) => {
  const files = JSON.parse(filesText)
  const { blobs } = await hubBlob().list({prefix: id.toString()})
  for (const blob of blobs) {
    const blobname = blob.pathname.split('/').pop()
    if (!files.includes(blobname!)) {
      await hubBlob().delete(blob.pathname)
    }
  }
}

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { id, text, boardId, files } = await readBody(event)
  
  if (id > 0) {
    const message = await updateMessage({
      id: id,
      text: text,
      files: files,
      authorId: user.id,
    })
    await files2blob(files, id)
    return message
  }

  const message = await appendMessage({
    text: text,
    boardId: boardId,
    authorId: user.id,
  })
  return message
})
