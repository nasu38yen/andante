<script setup lang="ts">
    import * as v from 'valibot'
    import type { FormSubmitEvent } from '@nuxt/ui'

    const schema = v.object({
        email: v.pipe(v.string(), v.email('有効なメールアドレスを入力してください')),
        password: v.pipe(v.string(), v.minLength(8, '8文字以上で入力してください')),
    })
    type Schema = v.InferOutput<typeof schema>

    const { fetch: refreshSession  } = useUserSession()
    const state = ref({
        email: '',
        password: ''
    })

    const showAlert = ref(false)
    const errorMessage = ref('')
    const showPassword = ref(false)
1
    async function onSubmit(event: FormSubmitEvent<Schema>) {
      showAlert.value = false
      errorMessage.value = ''
      
      await $fetch('/api/login', {
        method: 'POST',
        body: state.value
      })
      .then(async () => {
        await refreshSession()
        await navigateTo('/board')
      })
      .catch(() => {
        showAlert.value = true
        errorMessage.value = 'メールアドレスまたはパスワードが間違っています'
      })
    }
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">

    <UFormField label="Email" name="email">
      <UInput v-model="state.email" class="w-80" />
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput v-model="state.password" :type="showPassword ? 'text' : 'password'" class="w-80" />
    </UFormField>
    <UCheckbox v-model="showPassword" label="パスワードを表示する"></UCheckbox>

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

