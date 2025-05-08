<script setup lang="ts">
    const props = defineProps({
        name: String,
        id: String,
    })
</script>

<template>
    <div>
        <ULink :to="`/board/${props.id}`" class="text-blue-500 hover:underline">
            {{ props.name }}    
        </ULink>
    </div>
</template>