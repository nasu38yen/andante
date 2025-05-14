<script setup lang="ts">
    import * as v from 'valibot'
    import type { FormSubmitEvent } from '@nuxt/ui'

    const state = defineModel<VMessage>({ required: true });
    const emit = defineEmits(["onPost", "onClose"])

    import { ref } from 'vue'
    import MessageFileUpload from '~/components/message/FileUpload.vue'
    const uploadRef = ref<InstanceType<typeof MessageFileUpload>>()

    const schema = v.object({
        text: v.pipe(v.string(), v.maxLength(200, '200文字までです')),
    })
    type Schema = v.InferOutput<typeof schema>

    async function onSubmit(event: FormSubmitEvent<Schema>) {     
      await $fetch('/api/messages/board', {
        method: 'POST',
        //body: state
        body: state.value
      })
      .then(async (res) => {
        if (res) {
          const messageId = res.id
          await uploadRef.value?.uploadFiles(messageId.toString())
        } else {
          //alert('Failed to post message:\n'+ res.data?.message)
        }
        emit('onPost')
      })
    }

    const closeForm = () => {
      emit('onClose')
    } 
</script>

<template>
  <UForm :schema="schema" :state="state!" class="space-y-4" @submit="onSubmit">
    <UFormField label="メッセージ" name="text">
      <UTextarea  v-model="state.text" />
    </UFormField>
    <MessageFilesEdit v-model="state.files" />
    <MessageFileUpload ref="uploadRef"  />
    <UButton type="submit">登録</UButton>
    <UButton @click="closeForm">閉じる</UButton>
  </UForm>
</template>