<script setup lang="ts">
    import * as v from 'valibot'
    import type { FormSubmitEvent } from '@nuxt/ui'

    const props = defineProps({
        data: {
            type: Object as () => Board,
            default: () => ({
                id: 0,
                name: '',
            }),
        }
    })
    const state = reactive(props.data)

    const schema = v.object({
        name: v.pipe(v.string(), v.maxLength(20, '20文字までです')),
    })
    type Schema = v.InferOutput<typeof schema>

    const showAlert = ref(false)
    const errorMessage = ref('')

    async function onSubmit(event: FormSubmitEvent<Schema>) {
      showAlert.value = false
      errorMessage.value = ''
      
      await $fetch('/api/boards', {
        method: 'POST',
        body: state
      })
      .then(async () => {
        await navigateTo('/board')
      })
      .catch(() => {
        showAlert.value = true
        errorMessage.value = '登録に失敗しました'
      })
    }
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <div>
        <UInput type="hidden" name="id" v-model="state.id" />
    </div>

    <UFormField label="伝言板名称" name="name">
      <UInput v-model="state.name" />
    </UFormField>

    <UAlert v-if="showAlert"
      :description="errorMessage"
      class="rounded-none"
      color="error"
      variant="soft"
    />

    <UButton type="submit">
      登録
    </UButton>
  </UForm>
</template>

