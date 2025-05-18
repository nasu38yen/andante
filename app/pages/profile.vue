<script setup lang="ts">
    definePageMeta({
        middleware: 'auth',
    })

    const { user, clear, fetch: refreshSession } = useUserSession();
    const data = computed(() =>{
            const rows = [
                {
                    label: 'ユーザー名',
                    value: user.value?.name,
                },
                {
                    label: 'メールアドレス',
                    value: user.value?.email,
                },
            ]
            if (user.value?.role == 'admin') {
                rows.push({
                    label: '役割',
                    value: '管理者',
                })
            }
            return rows
    });

    const columns = [
        {
            accessorKey: 'label',
            meta: { class: {td: 'w-24'} },
        },
        {
            accessorKey: 'value',
            meta: { class: {td: 'w-auto'} },
        },
    ];

    const logout = async () => {
        await clear()
        navigateTo('/')
    };

    const handleFileSelect = async (event: Event) => {
        const input = event.target as HTMLInputElement
        const file = input.files?.[0]       
        if (file) {
            const formData = new FormData()
            formData.append('file', file)
            try {
                await $fetch('/api/account/avatar', {
                    method: 'POST',
                    body: formData,
                })
                await refreshSession()
            }
            catch (error) {
                useErrorToast('An error occurred while uploading your profile picture')
            }
        }
    };
</script>

<template>
    <div>
      <PageTitle>アカウント</PageTitle>
      <div class="flex items-end gap-2">
        <UAvatar :src="user!.avatar" size="3xl" />
        <label for="fileInput" class="bg-lunar-green-200 text-lunar-green-600 hover:bg-lunar-green-300 hover:text-lunar-green-800 
                rounded-md px-2 cursor-pointer text-sm">
            アバターを変更
            <input type="file" id="fileInput" name="file_select"
                    class="hidden" accept=".jpg, .jpeg, .png, .gif" @change="handleFileSelect" />
        </label>      

      </div>
      <UTable :data="data" :columns="columns" :ui="{ thead: 'hidden' }" />
      <div class="flex gap-2  my-4">
        <UButton @click="logout">ログアウト</UButton>
        <UButton to="/account/passwordchange" color="neutral" variant="outline">パスワード変更</UButton>
      </div>
    </div>
</template>
