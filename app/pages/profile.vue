<script setup lang="ts">
    definePageMeta({
        middleware: 'auth',
    })

    const { user, clear } = useUserSession();
    const logout = () => {
        clear(); 
        navigateTo('/');
    };
</script>

<template>
    <div>
      <!-- ログイン情報の確認用 -->
      <div>user</div>
      <pre>{{ JSON.stringify(user, null, 2) }}</pre>
      <div>
        <UButton @click="logout">ログアウト</UButton>
      </div>
    </div>
</template>