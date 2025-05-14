<script setup lang="ts">
    definePageMeta({
        middleware: 'auth',
    })

    import type { TableColumn } from '@nuxt/ui'
    import { h, resolveComponent } from 'vue'
    import type { Row } from '@tanstack/vue-table'
    import { ConfirmModal } from '#components'

    const route = useRoute()
    const id = route.params.id
    const { data: board } = await useFetch(`/api/boards/${id}`)
    const { data: messages, refresh } = await useFetch(`/api/messages/board/${id}`)

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
        // meta: { class: {td: 'w-1 text-red-500'} },  
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
            openEditPost(row.original)
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

    const newMessage = <VMessage>{
      id: 0,
      text: '',
      boardId: id,
      files: '[]',
    }

    const formData = ref(newMessage)
    const showForm = ref(false)

    const openNewPost = () => {
      formData.value = {
        id: 0,
        text: '',
        boardId: id? id.toString() : '',
        files: '[]',
      }
      showForm.value = true
    }

    const openEditPost = (message: Message) => {
      formData.value =  {
        id: message.id,
        text: message.text,
        boardId: message.boardId ? message.boardId.toString() : '0',
        files: message.files ? message.files : '[]',
      }      
      showForm.value = true
    }

    const afterPost = async () => {
      refreshList()
      showForm.value = false
    }

    const closeForm = () => {
      showForm.value = false
    } 

    const overlay = useOverlay()
    const confirmModal = overlay.create(ConfirmModal, {
    })

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
    <div v-show="!showForm">
      <UButton @click="openNewPost" color="primary" size="sm" class="mb-4">
        <i class="i-lucide-plus"></i>
        新規メッセージ
      </UButton>
    </div>
    <div v-show="showForm">
      <!-- <MessagePost :data="formData" @onPost="afterPost"  /> -->
      <MessagePost v-model="formData" @onPost="afterPost" @onClose="closeForm"  />
    </div>
    <UTable :data="messages" :columns="columns" class="flex-1" />
    <p v-if="!messages?.length">
      No messages yet
    </p>
  </div>
</template>
