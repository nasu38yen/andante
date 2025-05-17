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
        <ULink :href="`/files/${props.messageId}/${file}`" target="_blank" class="hover:text-orange-500">
          {{ file }}
        </ULink >
      </li>
    </ul>
</template>