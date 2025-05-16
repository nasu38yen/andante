export default defineNuxtRouteMiddleware(() => {
    const { loggedIn, user } = useUserSession();
    
    // 未ログインなら、ログイン画面にリダイレクト
    if (!loggedIn.value) return navigateTo('/login');

    // 管理者権限を持っていない場合は、403エラーを返す
    if (!user.value || !user.value.isAdmin) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden',
        })
    }   
});