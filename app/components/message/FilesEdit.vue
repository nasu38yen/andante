<script setup lang="ts">
    const filesText = defineModel<string>({ required: true })
    const files = computed(() => {
      return JSON.parse(filesText.value)
    })
    
    const removeFile = (index: number) => {
      files.value.splice(index, 1);
      filesText.value = JSON.stringify(files.value)
    };
</script>

<template>
  <div>
    <ul>
      <li v-for="(file, index) in files" :key="index">
        {{ file }}
        <UButton @click="removeFile(index)">削除</UButton>
      </li>
    </ul>
  </div>
</template>