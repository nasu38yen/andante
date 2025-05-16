<script setup lang="ts">
  definePageMeta({
      middleware: 'admin', 
      title: '伝言板の編集',
  })
  const route = useRoute()
  const id = route.params.id
  const { data: board } = await useFetch(`/api/boards/${id}`)

  const { user } = useUserSession();
  onMounted(() => {
    if (!board.value || !user.value || board.value.authorId !== user.value.id) {      
        throw createError({ statusCode: 403, statusMessage: 'Forbidden', message: 'この伝言板はあなたのものではありません。' });
    }
  });  
</script>

<template>
  <PageTitle>伝言板の設定</PageTitle>
  <BoardEditForm :data="board" />
</template>
