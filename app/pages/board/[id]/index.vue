<script setup lang="ts">
    import type { TableColumn } from '@nuxt/ui'
    import { h, resolveComponent } from 'vue'
    import type { Row } from '@tanstack/vue-table'
    import { MessagePostModal, ConfirmModal } from '#components'

    definePageMeta({
        middleware: 'auth',
    })

    const route = useRoute()
    const id = route.params.id
    const { data: board } = await useFetch(`/api/boards/${id}`)
    const { data: messages, refresh } = await useFetch('/api/messages/board/' + id)

    const refreshList = async () => {
      await refresh()
    }
    const UButton = resolveComponent('UButton')
    const UDropdownMenu = resolveComponent('UDropdownMenu')
    const MessageFilesView = resolveComponent('MessageFilesView')

    const columns: TableColumn<Message>[] = [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'text',
        header: 'メッセージ',
      },
      {
        accessorKey: 'files',
        header: 'ファイル',
        cell: ({ row }) => {
          return h(MessageFilesView, { files: row.original.files, messageId: row.original.id.toString() })
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

    function getRowActionItems(row: Row<Message>) {
      return [
        {
          label: '編集',
          onSelect() {
            modalOpenEdit(row.original)
          }
        },
        {
          label: '削除',
          onSelect() {
            deleteMessage(row.original)
          }
        },
      ]
    }    
    
    const newMessage = {      
        id: 0,
        text: '',
        boardId: id,
        files: '',
    }

    const overlay = useOverlay()
    const postModal = overlay.create(MessagePostModal, {
      props: {
        message: null,
      }
    })    
    const confirmModal = overlay.create(ConfirmModal, {
    })

    const modalOpenNew = async () => {
      postModal.patch({ message: newMessage })
      const dr =  await postModal.open()
      if (dr) {
        refreshList()
      }
    }
    const modalOpenEdit = async (message: Message) => {
      postModal.patch({ message: message })
      const dr =  await postModal.open()
      if (dr) {
        refreshList()
      }
    }

    const deleteMessage = async (message: Message) => {
      const dr =  await confirmModal.open()
      if (dr) {
        await $fetch('/api/messages/' + message.id, {
          method: 'DELETE',
        })
        refreshList()
      }
    }

</script>

<template>
  <div>
    <h3>Board</h3>
    <div>{{ board?.name }}</div>
    <div>
      <UButton @click="modalOpenNew" color="primary" size="sm" class="mb-4">
        <i class="i-lucide-plus"></i>
        新規メッセージ
      </UButton>
    </div>
    <UTable :data="messages" :columns="columns" class="flex-1" />
    <p v-if="!messages?.length">
      No messages yet
    </p>
  </div>
</template>
