<script setup lang="ts">
    const props = defineProps({
        files: String,
        messageId: String,
    })
    const files = computed(() => JSON.parse(props.files!))
</script>

<template>
    <ul>
      <li v-for="(file, index) in files" :key="index">
        <a :href="`/images/${props.messageId}/${file}`" target="_blank">{{ file }}</a>
      </li>
    </ul>
</template>