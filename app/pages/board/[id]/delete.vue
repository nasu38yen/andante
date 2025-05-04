<script setup lang="ts">
    definePageMeta({
        middleware: 'auth',
    })
    const route = useRoute()
    const id = route.params.id
    const { data: board } = await useFetch(`/api/boards/${id}`)
    const state = reactive(board.value!)

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
  <div>
    <h3>板の削除</h3>
    <UForm :state="state" class="space-y-4" @submit="onSubmit">
      <div>
          <UInput type="hidden" name="id" v-model="state.id" />
      </div>

      <UFormField label="伝言板名称" name="name">
        <UInput v-model="state.name" />
      </UFormField>

      <UButton type="submit">
        削除
      </UButton>
    </UForm>
  </div>
</template>
