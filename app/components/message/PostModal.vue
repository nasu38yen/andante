<script setup lang="ts">
    const props = defineProps({
        message: {
            type: Object as () => Message,
            required: true,
        }
    })

    const emit = defineEmits<{ close: [boolean] }>()
    const onPost = async () => {
        emit('close', true)
    }
</script>

<template>
    <UModal>
        <template #body>
            <MessagePost :data="props.message" @onPost="onPost"  />
        </template>
    </UModal>
</template>