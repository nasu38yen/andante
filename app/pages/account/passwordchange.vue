<script setup lang="ts">
    definePageMeta({
        middleware: 'auth',
    })
    
    const { user, fetch: refreshSession } = useUserSession();

    const state = ref({
        id: user.value?.id,
        email: user.value?.email,
        password1: "",       
        password2: "",       
    })
    const showPassword = ref(false)
    const passwordType = computed(() => showPassword.value ? 'text' : 'password')
    
    import * as v from 'valibot'
    import type { FormSubmitEvent } from '@nuxt/ui'

    const schema = v.pipe(
        v.object({
            password1: v.pipe(v.string(), v.minLength(8, '8文字以上で入力してください')),
            password2: v.pipe(v.string()),
        }),
        v.forward(
            v.partialCheck(
                [['password1'], ['password2']],
                (input) => input.password1 === input.password2,
                '確認パスワードが一致しません'
            ),
            ['password2']
        )
    )
    type Schema = v.InferOutput<typeof schema>

    async function onSubmit(event: FormSubmitEvent<Schema>) {
      await $fetch('/api/account/passwordchange', {
        method: 'POST',
        body: state.value
      })
      .then(async () => {
        await refreshSession()
        await navigateTo('/board')
      })
      .catch(() => {
        // showAlert.value = true
        // errorMessage.value = 'メールアドレスまたはパスワードが間違っています'
      })
    }
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <div>
        <input type="hidden" name="id" v-model="state.id" />
    </div>

    <UFormField label="Email" name="email">
      <UInput v-model="state.email" class="w-80" disabled />
    </UFormField>

    <UFormField label="新しいパスワード" name="password1">
      <UInput v-model="state.password1" :type="passwordType" class="w-80" />
    </UFormField>

    <UFormField label="確認用パスワード" name="password2">
      <UInput v-model="state.password2" :type="passwordType" class="w-80" />
    </UFormField>

    <UCheckbox v-model="showPassword" label="パスワードを表示する"></UCheckbox>

    <div class="flex items-center gap-2 mb-4">
      <UButton type="submit">変更</UButton>
      <UButton to="/profile" color="neutral" variant="outline">戻る</UButton>
    </div>
  </UForm>
</template>

