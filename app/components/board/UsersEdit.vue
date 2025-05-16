<script setup lang="ts">
    const usersText = defineModel<string>({ required: true })
    const array = JSON.parse(usersText.value || '[]') as string[]
    const users = reactive(array)
    
    const removeUser = (index: number) => {
        users.splice(index, 1);
        usersText.value = JSON.stringify(users)
    };

    const state = ref({
        email: ''
    })
    async function addUser() {
        if (state.value.email) {
            users.push(state.value.email)
            usersText.value = JSON.stringify(users)
            state.value.email = ''
        } else {
            alert('メールアドレスを入力してください')
        }
    }
</script>

<template>
    <ul>
      <li v-for="(user, index) in users" :key="index">
        <div class="flex items-center">
            <span class="w-96 px-2">{{ user }}</span>            
            <UButton @click="removeUser(index)" icon="i-lucide-x" color="neutral" variant="ghost"></UButton>
        </div>
      </li>
    </ul>
    <div class="flex items-center mt-2">
      <UInput v-model="state.email" class="w-96" type="email" name="email"
                placeholder="利用者のメールアドレスを入力して追加ボタンをクリックしてください" />
      <UButton @click="addUser" icon="i-lucide-plus" color="neutral" variant="ghost"></UButton>
    </div>
</template>