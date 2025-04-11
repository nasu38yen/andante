export default defineNuxtRouteMiddleware(() => {
    // 用意されたComposablesでログイン状態を取得
    const { loggedIn } = useUserSession();
    
    // 未ログインなら、ログイン画面にリダイレクト
    if (!loggedIn.value) return navigateTo('/login');
  });