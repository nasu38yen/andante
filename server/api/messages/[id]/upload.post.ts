export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event)
    const id = getRouterParam(event, 'id')

    return hubBlob().handleUpload(event, {
      multiple: false,
      ensure: {
        maxSize: '16MB',
        // types: ['image/png', 'image/jpeg']
      },
      put: {
        prefix: id,
      }
    })
  })
  