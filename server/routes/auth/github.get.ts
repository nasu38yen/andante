export default defineOAuthGitHubEventHandler({
  async onSuccess(event, { user, tokens }) {
    const githubId = user.id
    //const userFromDB = await useDrizzle().select().from(tables.users).where(eq(tables.users.githubId, githubId)).get()

    // セッションに追加で保存するユーザー情報
    await setUserSession(event, {
      user
    })
    return sendRedirect(event, '/home')
  },

  onError(event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/')
  },
})