<script setup lang="ts">
  definePageMeta({
      middleware: 'auth',
  })

  const { user, clear } = useUserSession();
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
</script>

<template>
    <div>
      <PageTitle>アカウント</PageTitle>
      <UAvatar :src="user!.avatar" size="3xl" />
      <UTable :data="data" :columns="columns" :ui="{ thead: 'hidden' }" />
      <div class="flex gap-2  my-4">
        <UButton @click="logout">ログアウト</UButton>
        <UButton to="/account/passwordchange" color="neutral" variant="outline">パスワード変更</UButton>
      </div>
    </div>
</template>
