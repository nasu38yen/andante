<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

// 確認用のログイン情報の取得
const { session, user } = useUserSession();
</script>

<template>
    <div>
      <div>ホーム画面</div>
  
      <!-- ログイン情報の確認用 -->
      <div>user</div>
      <pre>{{ JSON.stringify(user, null, 2) }}</pre>
  
      <div>session</div>
      <pre>{{ JSON.stringify(session, null, 2) }}</pre>
    </div>
</template>