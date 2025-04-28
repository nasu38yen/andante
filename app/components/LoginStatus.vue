<script setup lang="ts">
    const { user } = useUserSession();
    const userName = computed(() => user.value?.name ?? 'ゲスト');
</script>

<template>
    <AuthState>
      <template #default="{ loggedIn }">
        <NuxtLink v-if="loggedIn" to="/profile">{{ userName }}</NuxtLink>
        <NuxtLink v-else to="/login">ログイン</NuxtLink>
      </template>
      <template #placeholder>
        <button disabled>Loading...</button>
      </template>
    </AuthState>
</template>
