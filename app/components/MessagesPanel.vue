<script setup lang="ts">
const { data: messages, refresh } = await useFetch('/api/messages')
const newMessage = ref('')

async function sendMessage (){
  if (!newMessage.value.trim()) return
  await $fetch('/api/messages', {
    method: 'POST',
    body: {
      text: newMessage.value
    }
  })
  newMessage.value = ''
  await refresh()
}
</script>

<template>
  <div>
    <h3>Messages</h3>
    <form @submit.prevent="sendMessage">
      <UInput v-model="newMessage" placeholder="Type a message" />
      <UButton type="submit">
        Send
      </UButton>
    </form>
    <div v-for="message of messages" :key="message.id">
      <span>{{ message.text }} -</span> <span v-if="message.created_at">{{ new Date(message.created_at) }}</span>
    </div>
    <p v-if="!messages?.length">
      No messages yet
    </p>
  </div>
</template>
