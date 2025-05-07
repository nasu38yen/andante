import { findMessageById } from "~~/server/utils/message"

export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event)
    const id = getRouterParam(event, 'id')

    const blobs = await hubBlob().handleUpload(event, {
      multiple: false,
      ensure: { maxSize: '16MB' },
      put: { prefix: id }
    })

    if (blobs) {
      const message = await findMessageById(Number(id))
      if (message) {
        const files = message.files ? JSON.parse(message.files) : []
        for (const blob of blobs) {
          const filename = blob.pathname.split('/').pop()
          files.push(filename!)
        }
        await useDrizzle().update(tables.messages).set({
          files: JSON.stringify(files),
        }).where(eq(tables.messages.id, message.id!)).returning().get()
      }  
    }

    return blobs
  })
  