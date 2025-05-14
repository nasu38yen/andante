<script setup lang="ts">
    const props = defineProps({
        items: {
            type: Array as () => Array<{ label: string; onSelect: () => void }>,
            required: true,
        },
    })
</script>

<template>
    <div class="text-right">
        <UDropdownMenu :items="items" :content="{ align: 'end' }" aria-label="Actions dropdown">
            <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" class='ml-auto' aria-label='Actions dropdown' />
        </UDropdownMenu>        
    </div>
</template>