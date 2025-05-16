<script setup lang="ts">
    const state = defineModel<VMessage>({ required: true });
    const emit = defineEmits(["sumbited", "canceled"])
    
    const textRows = computed(() => {
      const rows = state.value.text.split('\n').length;
      return rows + 3
    })

    import MessageFileUpload from '~/components/message/FileUpload.vue'
    const uploadRef = ref<InstanceType<typeof MessageFileUpload>>()

    import * as v from 'valibot'
    import type { FormSubmitEvent } from '@nuxt/ui'

    const schema = v.object({
        text: v.pipe(v.string(), v.maxLength(1000, '最大文字数は1000文字です')),
    })
    type Schema = v.InferOutput<typeof schema>

    async function onSubmit(event: FormSubmitEvent<Schema>) {     
      await $fetch('/api/messages/board', {
        method: 'POST',
        body: state.value
      })
      .then(async (res) => {
        if (res) {
          await uploadRef.value?.uploadFiles(res.id.toString())
          emit('sumbited')
        } else {
          //alert('Failed to post message:\n'+ res.data?.message)
        }
      })
    }

    const closeForm = () => {
      emit('canceled')
    } 
</script>

<template>
  <UForm :schema="schema" :state="state!" class="space-y-4 mb-2" @submit="onSubmit">
    <UFormField label="メッセージ" name="text">
      <UTextarea v-model="state.text" :rows="textRows" class="w-full" />
    </UFormField>

    <MessageFilesEdit v-model="state.files" />
    <MessageFileUpload ref="uploadRef" :id="state.id.toString()"  />

    <div class="flex items-center gap-2 mb-4">
      <UButton type="submit">登録</UButton>
      <UButton @click="closeForm" color="neutral" variant="outline">閉じる</UButton>
    </div>
  </UForm>
</template>