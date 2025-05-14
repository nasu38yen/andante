<script lang="ts" setup>
  const loginWithGitHub = async () => {
    // GitHub の認証ページにリダイレクト
    await navigateTo('/auth/github', { external: true })
  }
  const loginWithGoogle = async () => {
    // GitHub の認証ページにリダイレクト
    await navigateTo('/auth/google', { external: true })
  }
</script>

<template>
    <div class="flex items-center gap-4">
        <UButton @click="loginWithGitHub">GitHub でログイン</UButton>
        <UButton @click="loginWithGoogle">Google でログイン</UButton>
    </div>
</template>
