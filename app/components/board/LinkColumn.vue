<script setup lang="ts">
    const props = defineProps({
        name: String,
        id: String,
    })
</script>

<template>
    <ULink :to="`/board/${props.id}`" class="text-indigo-700 text-lg hover:underline">
        {{ props.name }}    
    </ULink>
</template>