<script lang="ts" setup>
const loginWithGitHub = async () => {
  // GitHub の認証ページにリダイレクト
  await navigateTo('/auth/github', { external: true })
}
</script>

<template>
  <div>
    <UButton @click="loginWithGitHub">
      GitHub でログイン
    </UButton>
  </div>
</template>
