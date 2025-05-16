<script setup lang="ts">
    definePageMeta({
        middleware: 'auth',
    })

    const route = useRoute()
    const id = route.params.id
    const { data: board } = await useFetch(`/api/boards/${id}`)
    const { data: messages, refresh } = await useFetch(`/api/messages/board/${id}`)

    const refreshList = async () => {
      await refresh()
    }

    const showForm = ref(false)
    const formData = ref()

    const openNewPost = () => {
      formData.value = {
        id: 0,
        text: '',
        boardId: id? id.toString() : '',
        files: '[]',
      }
      showForm.value = true
    }

    const afterPost = async () => {
      refreshList()
      showForm.value = false
    }

    const closeForm = () => {
      showForm.value = false
    } 
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <PageTitle>{{ board?.name }}</PageTitle>
      <UButton v-if="!showForm" @click="openNewPost" color="primary" icon="i-lucide-plus">
        新規メッセージ
      </UButton>
    </div>
    <div v-if="showForm">
      <MessagePost v-model="formData" @sumbited="afterPost" @canceled="closeForm"  />
    </div>

    <MessageCard v-for="(message) in messages" 
      :data="message" @updated="refreshList"
      class="mb-4"></MessageCard>
    
    <p v-if="!messages?.length">
      No messages yet
    </p>
  </div>
</template>
