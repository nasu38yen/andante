import { findUserByEmail } from "~~/server/utils/user"

export default defineOAuthGitHubEventHandler({
  async onSuccess(event, { user }) {
    if (!user.email) {        
      // GitHubのユーザー情報にメールアドレスがない場合
      console.error('GitHub OAuth User has no email')
      return sendRedirect(event, '/')
    }
    const appuser = await findUserByEmail(user.email)
    if (!appuser) {
      // ユーザーが登録されていない場合
      console.error('GitHub OAuth User is not defined: ' + user.email)
      return sendRedirect(event, '/')
    }

    //await setUserSession(event, { user });
    await setUserSession(event, { 
      user: {
        id: appuser.id,
        name: appuser.name,
        email: appuser.email,
      },
    })
    return sendRedirect(event, '/home')
  },

  onError(event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/')
  },
})