<script setup lang="ts">
    definePageMeta({
        middleware: 'auth',
    })
    const { user } = useUserSession();

    const { data: boards } = await useFetch('/api/boards')

    onMounted(() => {
      if (user && user.value?.isAdmin && boards.value && boards.value.length === 1)  {
        // 1件だけの時は、詳細画面に遷移
        const id = boards.value[0]?.id
        navigateTo(`/board/${id}`)     
      }
    });  

    import type { TableColumn } from '@nuxt/ui'
    import { h, resolveComponent } from 'vue'
    import type { Row } from '@tanstack/vue-table'

    const BoardLinkColumn = resolveComponent('BoardLinkColumn')
    const TableActionsColumn = resolveComponent('TableActionsColumn')

    const columns: TableColumn<Board>[] = [
      {
        accessorKey: 'name',
        header: '伝言板',
        cell: ({ row }) => {
          return h(BoardLinkColumn, { name: row.original.name, id: row.original.id.toString() })
        } 
      },
      {
        accessorKey: 'updatedAt',
        header: '更新日時',
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          // 所有してない板は、変更できない
          if (row.original.authorId !== user.value?.id) {
            return ""
          }
          return h(TableActionsColumn, { items: getRowActionItems(row) })
        }
      }
    ]

    function getRowActionItems(row: Row<Board>) {
        return [
          {
            label: '設定',
            onSelect() {
              navigateTo(`/board/${row.original.id}/edit`)
            }
          },
          {
            label: '削除',
            onSelect() {
              navigateTo(`/board/${row.original.id}/delete`)
            }
          },
        ]
    }
</script>

<template>
  <div class="mb-4">
    <div class="flex items-center justify-between">
      <PageTitle>伝言板一覧</PageTitle>
      <UButton v-if="user?.isAdmin" to="/board/create" icon="i-lucide-plus">
        伝言板を追加
      </UButton>
    </div>
    <UTable :data="boards" :columns="columns" class="flex-1" />
    <p v-if="!boards?.length">
      No boards yet
    </p>
  </div>
</template>
