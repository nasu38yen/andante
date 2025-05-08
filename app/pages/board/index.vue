<script setup lang="ts">
    import type { TableColumn } from '@nuxt/ui'
    import { h, resolveComponent } from 'vue'
    import type { Row } from '@tanstack/vue-table'

    definePageMeta({
        middleware: 'auth',
    })

    const { data: boards } = await useFetch('/api/boards')

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
        header: '板名称',
        cell: ({ row }) => {
          return h(BoardLinkColumn, { name: row.original.name, id: row.original.id.toString() })
        } 
      },
      {
        accessorKey: 'createdAt',
        header: '作成日時',
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          return h(
            'div',
            { class: 'text-right' },
            h(
              UDropdownMenu,
              {
                content: {
                  align: 'end'
                },
                items: getRowActionItems(row),
                'aria-label': 'Actions dropdown'
              },
              () =>
                h(UButton, {
                  icon: 'i-lucide-ellipsis-vertical',
                  color: 'neutral',
                  variant: 'ghost',
                  class: 'ml-auto',
                  'aria-label': 'Actions dropdown'
                })
            )
          )
        }
      }
    ]
    function getRowActionItems(row: Row<Board>) {
      return [
        {
          label: '編集',
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
  <div>
    <h3>Boards</h3>
    <div>
      <NuxtLink to="/board/create" class="btn btn-primary">新規追加</NuxtLink>
    </div>
    <UTable :data="boards" :columns="columns" class="flex-1" />
    <p v-if="!boards?.length">
      No boards yet
    </p>
  </div>
</template>
