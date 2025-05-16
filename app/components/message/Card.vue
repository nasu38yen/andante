<script setup lang="ts">
    const props = defineProps({
        data: {
            type: Object,
            required: true,
        }
    })

    const { user } = useUserSession()
    const ownMessage = computed(() => {
      return props.data.authorId === user.value!.id
    })

    import { Marked } from 'marked'
    import hljs from 'highlight.js'
    import { markedHighlight } from 'marked-highlight'
    import 'highlight.js/styles/github-dark.css'
    const marked = new Marked(
        markedHighlight({
            langPrefix: 'hljs language-',
            highlight(code, lang) {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext'
                return hljs.highlight(code, { language }).value
            }
        })
    )

    const markdown = computed(() => {
      return marked.parse(props.data.text)
    })

    const emit = defineEmits(["updated"])

    function getRowActionItems() {
      return [
        {
          label: '編集',
          onSelect() { openEditForm() }
        },
        {
          label: '削除',
          onSelect() { deleteMessage() }
        },
      ]
    }    

    const formData = ref()
    const showForm = ref(false)

    const openEditForm = () => {
      formData.value = {
        id: props.data.id,
        text: props.data.text,
        boardId: props.data.boardId,
        files: props.data.files,
      }
      showForm.value = true
    }

    const overlay = useOverlay()
    import { ConfirmModal } from '#components'
    const confirmModal = overlay.create(ConfirmModal, {
      props: {
        title: '削除確認',
        message: '本当に削除しますか？',
      },
    })

    const deleteMessage = async () => {
      const dr =  await confirmModal.open()
      if (dr) {
        await $fetch('/api/messages/' + props.data.id, {
          method: 'DELETE',
        })
        emit('updated')
      }
    }

    const afterPost = async () => {
      emit('updated')
      showForm.value = false
    }

    const closeForm = () => {
      showForm.value = false
    } 
</script>

<template>
  <UCard v-if="!showForm" :ui="{ header: ownMessage ? 'bg-mine-shaft-100' : '' }">
    <template #header>
        <div class="flex items-center justify-between">
            <div>
              <span>{{ props.data.authorName }}</span>
              <span class="ml-4">{{ props.data.createdAt }}</span>
            </div>
            <UDropdownMenu v-if="ownMessage" 
                :items="getRowActionItems()" :content="{ align: 'end' }" aria-label="Actions dropdown">
                <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" class='ml-auto' aria-label='Actions dropdown' />
            </UDropdownMenu>        
        </div>
    </template>
    <article v-html="markdown"></article>
    <template #footer>
        <MessageFilesView :files="props.data.files!" :messageId="props.data.id.toString()" ></MessageFilesView>
    </template>
  </UCard>
  <div v-else>
    <MessagePost v-model="formData" @sumbited="afterPost" @canceled="closeForm"  />
  </div>
</template>