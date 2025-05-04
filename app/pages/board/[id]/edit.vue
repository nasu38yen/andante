<script setup lang="ts">
    definePageMeta({
        middleware: 'auth',
    })
    const route = useRoute()
    const id = route.params.id
    const { data: board } = await useFetch(`/api/boards/${id}`)
</script>

<template>
  <div>
    <h3>板の編集</h3>
    <div>
        <BoardEditForm :data="board" />
    </div>
  </div>
</template>
