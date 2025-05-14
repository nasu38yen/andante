<script setup lang="ts">
    definePageMeta({
        middleware: 'auth',
    })

    import type { TableColumn } from '@nuxt/ui'
    import { h, resolveComponent } from 'vue'
    import type { Row } from '@tanstack/vue-table'

    const { data: users } = await useFetch('/api/users')

    const UButton = resolveComponent('UButton')
    const UDropdownMenu = resolveComponent('UDropdownMenu')
    const BoardLinkColumn = resolveComponent('BoardLinkColumn')

    const columns: TableColumn<Board>[] = [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'name',
        header: 'ユーザー名',
        // cell: ({ row }) => {
        //   return h(BoardLinkColumn, { name: row.original.name, id: row.original.id.toString() })
        // } 
      },
    ]
</script>

<template>
  <div>
    <h3>Users</h3>
    <div>
      <NuxtLink to="/user/create" class="btn btn-primary">新規追加</NuxtLink>
    </div>
    <UTable :data="users" :columns="columns" class="flex-1" />
    <p v-if="!users?.length">
      No boards yet
    </p>
  </div>
</template>
