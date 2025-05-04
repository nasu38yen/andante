<script setup lang="ts">
    definePageMeta({
        middleware: 'auth',
    })
</script>

<template>
  <div>
    <h3>新規追加</h3>
    <div>
        <BoardEditForm />
    </div>
  </div>
</template>
