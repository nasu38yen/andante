import { findUserByEmail } from "~~/server/utils/user"

export default defineOAuthGitHubEventHandler({
  async onSuccess(event, { user }) {
    const githubId = user.id
    const appuser = await findUserByEmail(user.email)
    if (!appuser) {
      // ユーザーが登録されていない場合
      console.error('GitHub OAuth User is not defined: ' + user.email)
      return sendRedirect(event, '/login')
    }
    // セッションに追加で保存するユーザー情報
    await setUserSession(event, { 
      user: {
        id: appuser.id,
        name: appuser.name,
        email: appuser.email,
      },
    })
    //await setUserSession(event, { user });
    return sendRedirect(event, '/home')
  },

  onError(event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/')
  },
})