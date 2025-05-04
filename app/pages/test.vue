<script setup lang="ts">
    import { ref } from 'vue'
    import MessageFileUpload from '~/components/message/FileUpload.vue'
    const childRef = ref<InstanceType<typeof MessageFileUpload>>()
    const uploadFiles = async () => {
        if (childRef.value) {
            await childRef.value.uploadFiles('aaa')
        }
    }
</script>

<template>
    <div>
        <MessageFileUpload ref="childRef" />
        <UButton @click="uploadFiles">Upload</UButton>
    </div>

</template>