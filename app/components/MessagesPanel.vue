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
    <p v-for="message of messages" :key="message.id">
      {{ message.text }} - {{ new Date(message.created_at).toLocaleString('fr-FR') }}
    </p>
    <p v-if="!messages?.length">
      No messages yet
    </p>
  </div>
</template>
