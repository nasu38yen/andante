<script setup lang="ts">
    const props = defineProps({
        name: String,
        id: String,
    })
</script>

<template>
    <ULink :to="`/board/${props.id}`" class="text-indigo-900 hover:text-orange-500 text-lg">
        {{ props.name }}    
    </ULink>
</template>