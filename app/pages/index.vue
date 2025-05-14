<script setup lang="ts">
  const { loggedIn, user } = useUserSession();
  onMounted(() => {
    if (loggedIn.value) {      
      navigateTo('/board')
    } else {
      console.log('user is null');
    }
  });  
</script>

<template>
  <main>
    <PageTitle>ホーム画面</PageTitle>

  </main>
</template>
