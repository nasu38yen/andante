<script setup lang="ts">
    const props = defineProps({
        id: {
            type: String,
            required: true,
        }
    })
    const fileInputId = `file_select_${props.id}`

    const selectedFiles = ref<File[]>([]);

    const handleFileSelect = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files) {
        selectedFiles.value.push(...Array.from(input.files));
      }
    };

    const removeFile = (index: number) => {
      selectedFiles.value.splice(index, 1);
    };
    
    const uploadFiles = async (id: string) => {
      const upload = useUpload(`/api/messages/${id}/upload`, {
          multiple: false
      })
      for (const file of selectedFiles.value) {
        await upload(file)
        .then(async () => {
          // console.log(`${file.name} のアップロード成功`);
        })
        // サーバー側でファイルチェック（type, size）> エラーは捨ててなにもしない
        //.catch((err) => alert('Failed to upload file:\n'+ err.data?.message))
        .catch((err) => {})
      }
      selectedFiles.value.splice(0)
    };

    defineExpose({
      uploadFiles
    })
</script>

<template>
  <div>
    <ul>
      <li v-for="(file, index) in selectedFiles" :key="index">
        <div class="flex items-center">
          <UButton @click="removeFile(index)" icon="i-lucide-x" color="neutral" variant="ghost"></UButton>
          <span>{{ file.name }}</span>
        </div>
      </li>
    </ul>
    <div class="mt-4">
      <label :for="fileInputId" class="bg-lunar-green-200 text-lunar-green-600 hover:bg-lunar-green-300 hover:text-lunar-green-800 rounded-md px-4 py-2 cursor-pointer">
        添付ファイルを追加
        <input type="file" :id="fileInputId" name="file_select"
                class="hidden" accept=".jpg, .jpeg, .png, .gif, .pdf" @change="handleFileSelect" />
      </label>      
    </div>
  </div>
</template>