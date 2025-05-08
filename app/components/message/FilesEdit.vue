<script setup lang="ts">
    const filesText = defineModel<string>({ required: true })
    const array = JSON.parse(filesText.value)
    const files = reactive(array)
    
    const removeFile = (index: number) => {
      files.splice(index, 1);
      filesText.value = JSON.stringify(files)
    };
</script>

<template>
    <ul>
      <li v-for="(file, index) in files" :key="index">
        {{ file }}
        <UButton @click="removeFile(index)">削除</UButton>
        <UButton >あああ</UButton>
      </li>
    </ul>
</template>