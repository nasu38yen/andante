export default defineOAuthGoogleEventHandler({
    // 認証が成功したときの処理
    async onSuccess(event, { user }) {
      // ユーザセッションをCookieに保存
      await setUserSession(event, { user });
      
      // ログイン後画面にリダイレクト
      return sendRedirect(event, '/home');
    },
    
    onError(event, error) {
        console.error('Google OAuth error:', error)
        return sendRedirect(event, '/')
    },
  });