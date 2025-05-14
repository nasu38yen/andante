<script setup lang="ts">
  definePageMeta({
      middleware: 'auth',
  })

  const { user, clear } = useUserSession();
  const data = computed(() => [
      {
          label: 'ユーザー名',
          value: user.value?.name,
      },
      {
          label: 'メールアドレス',
          value: user.value?.email,
      },
      {
          label: '役割',
          value: user.value?.role == 'admin' ? '管理者' : '一般',
      },
  ]);

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
      <PageTitle>プロファイル</PageTitle>
      <UTable :data="data" :columns="columns" :ui="{ thead: 'hidden' }" />
      <div class="flex my-4">
        <UButton @click="logout">ログアウト</UButton>
      </div>
    </div>
</template>
