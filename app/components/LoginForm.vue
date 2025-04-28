<script setup lang="ts">
    import * as v from 'valibot'
    import type { FormSubmitEvent } from '@nuxt/ui'

    const schema = v.object({
        email: v.pipe(v.string(), v.email('有効なメールアドレスを入力してください')),
        password: v.pipe(v.string(), v.minLength(8, '8文字以上で入力してください')),
    })
    type Schema = v.InferOutput<typeof schema>

    const { fetch: refreshSession  } = useUserSession()
    const state = reactive({
        email: '',
        password: ''
    })

    const showAlert = ref(false)
    const errorMessage = ref('')

    // const toast = useToast()
    // async function onSubmit(event: FormSubmitEvent<Schema>) {
    //     toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
    //     console.log(event.data)
    // }
    async function onSubmit(event: FormSubmitEvent<Schema>) {
      showAlert.value = false
      errorMessage.value = ''
      
      await $fetch('/api/login', {
        method: 'POST',
        body: state
      })
      .then(async () => {
        // Refresh the session on client-side and redirect to the home page
        await refreshSession()
        await navigateTo('/home')
      })
      //.catch(() => alert('Bad credentials'))      
      .catch(() => {
        showAlert.value = true
        errorMessage.value = 'メールアドレスまたはパスワードが間違っています'
      })
    }
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">

    <UFormField label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormField>

    <UAlert v-if="showAlert"
      :description="errorMessage"
      class="rounded-none"
      color="error"
      variant="soft"
    />

    <UButton type="submit">
      ログイン
    </UButton>
  </UForm>
</template>

