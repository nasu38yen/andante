<script setup lang="ts">
    const usersText = defineModel<string>({ required: true })
    const array = JSON.parse(usersText.value || '[]') as string[]
    const users = reactive(array)
    
    const removeUser = (index: number) => {
        users.splice(index, 1);
        usersText.value = JSON.stringify(users)
    };

    const state = reactive({
        email: ''
    })
    async function addUser() {
        if (state.email) {
            users.push(state.email)
            usersText.value = JSON.stringify(users)
            state.email = ''
        } else {
            alert('メールアドレスを入力してください')
        }
    }
</script>

<template>
    <ul>
      <li v-for="(user, index) in users" :key="index">
        {{ user }}
        <UButton @click="removeUser(index)">削除</UButton>
      </li>
    </ul>
    <div>
      <UInput v-model="state.email" placeholder="Type a user's Email" />
      <UButton @click="addUser">追加</UButton>
    </div>
</template>