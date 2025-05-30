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
    <PageTitle>ようこそ Andante伝言板</PageTitle>
    <div class="flex flex-col justify-center mb-8">
      <p class="text-lg mb-8">ログインしてお進みください</p>
      <div class="flex space-x-4">
        <UButton to="/login" class="">ログイン</UButton>
      </div>        
    </div>
  </main>
</template>
