<script setup lang="ts">
    const { user } = useUserSession();
    const userName = computed(() => user.value?.name ?? 'ゲスト');
</script>

<template>
    <AuthState>
      <template #default="{ loggedIn }">        
        <UButton v-if="loggedIn" to="/profile">{{ userName }}</UButton>
        <UButton v-else to="/login">ログイン</UButton>
      </template>
      <template #placeholder>
        <UButton disabled>Loading...</UButton>
      </template>
    </AuthState>
</template>
