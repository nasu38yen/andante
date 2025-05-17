export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const { pathname } = getRouterParams(event)

  setHeader(event, 'Content-Security-Policy', 'default-src \'none\';')
  return hubBlob().serve(event, 'avatar/' + pathname)
})
