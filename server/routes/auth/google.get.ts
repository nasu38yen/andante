export default defineOAuthGoogleEventHandler({
    // 認証が成功したときの処理
    async onSuccess(event, { user }) {
      if (!user.email) {        
        console.error('Google OAuth User has no email')
        return sendRedirect(event, '/')
      }
      const appuser = await findUserByEmail(user.email)
      if (!appuser) {
        console.error('Google OAuth User is not defined: ' + user.email)
        return sendRedirect(event, '/')
      }
      await setUserSession(event, { 
        user: {
          id: appuser.id,
          name: appuser.name,
          email: appuser.email,
        },
      })

      // ログイン後画面にリダイレクト
      return sendRedirect(event, '/home');
    },
    
    onError(event, error) {
        console.error('Google OAuth error:', error)
        return sendRedirect(event, '/')
    },
  });