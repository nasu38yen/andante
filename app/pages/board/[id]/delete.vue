<script setup lang="ts">
    definePageMeta({
        middleware: 'admin',
        title: '伝言板の削除',
    })

    const route = useRoute()
    const id = route.params.id
    const { data: board } = await useFetch(`/api/boards/${id}`)
    const state = ref(board.value!)

    const { user } = useUserSession()
    onMounted(() => {
      if (!board.value || !user.value || board.value.authorId !== user.value.id) {      
          throw createError({ statusCode: 403, statusMessage: 'Forbidden', message: 'この伝言板はあなたのものではありません。' })
      }
    });  

    async function onSubmit() {
      await $fetch(`/api/boards/${id}`, {
        method: 'DELETE',
      })
      .then(async () => {
        await navigateTo('/board')
      })
    }
</script>

<template>
    <PageTitle>伝言板の削除</PageTitle>
    <UForm :state="state" class="space-y-4" @submit="onSubmit">
      <div>
          <input type="hidden" name="id" v-model="state.id" />
      </div>

      <UFormField label="名称" name="name">
        <UInput v-model="state.name" class="w-96" disabled />
      </UFormField>

      <UAlert color="warning"
        title="注意!"
        description="削除を実行すると、伝言板とその伝言は完全に削除されます。"
        class="rounded-none"
        variant="soft"
        icon="warning"
        icon-color="warning"
        icon-size="lg"
      />

      <div class="flex items-center gap-2 mb-4">
        <UButton type="submit">実行</UButton>
        <UButton to="/board" color="neutral" variant="outline">戻る</UButton>
      </div>
    </UForm>
</template>
