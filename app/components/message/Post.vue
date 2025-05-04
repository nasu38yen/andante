<script setup lang="ts">
    import * as v from 'valibot'
    import type { FormSubmitEvent } from '@nuxt/ui'

    import { ref } from 'vue'
    import MessageFileUpload from '~/components/message/FileUpload.vue'
    const uploadRef = ref<InstanceType<typeof MessageFileUpload>>()

    const props = defineProps({
        boardId: String,
    })

    const emit = defineEmits(["onPost"])

    const state = reactive({
        text: '',
        boardId: props.boardId,
    })

    const schema = v.object({
        text: v.pipe(v.string(), v.maxLength(200, '200文字までです')),
    })
    type Schema = v.InferOutput<typeof schema>

    async function onSubmit(event: FormSubmitEvent<Schema>) {     
      await $fetch('/api/messages/board', {
        method: 'POST',
        body: state
      })
      .then(async (res) => {
        if (res) {
          const messageId = res.id
          await uploadRef.value?.uploadFiles(messageId.toString())
        } else {
          //alert('Failed to post message:\n'+ res.data?.message)
        }
      })
      state.text = ''
      emit('onPost')
    }
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="メッセージ" name="text">
      <UInput v-model="state.text" />
    </UFormField>
    <MessageFileUpload ref="uploadRef"  />
    <UButton type="submit">
      登録
    </UButton>
  </UForm>
</template>