import { findMessageById } from "~~/server/utils/message"

export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event)
    const id = getRouterParam(event, 'id')

    // 投稿者以外はアップロードできない
    const message = await findMessageById(Number(id))
    if (message?.authorId !== user.id) {
      throw createError({ statusCode: 400, statusMessage: "Bad Request", message: "Not owner" })
    }

    const blobs = await hubBlob().handleUpload(event, {
      multiple: false,
      // ensure: { maxSize: '16MB' },
      put: { prefix: id }
    })

    if (blobs) {
      if (message) {
        // message.filesの更新
        const files = message.files ? JSON.parse(message.files) : []
        for (const blob of blobs) {
          const filename = blob.pathname.split('/').pop()
          if (!files.includes(filename!)) {
            files.push(filename!)
          }

          // message.textに画像リンクを自動で挿入
          const type = blob.pathname.split('.').pop()
          const name = filename?.split('.').shift()
          if (type === 'jpg' || type === 'png' || type === 'gif') {
            const linktext = `![${name}](/files/${blob.pathname})`
            if (!message.text?.includes(linktext)) {
              message.text = message.text ? message.text + '\n' + linktext : linktext
            } 
          }
        }

        await useDrizzle().update(tables.messages).set({
          files: JSON.stringify(files),
          text: message.text,
        }).where(eq(tables.messages.id, message.id!)).returning().get()
      }  
    }

    return blobs
  })
  