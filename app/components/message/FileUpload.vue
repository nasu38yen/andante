<script setup lang="ts">
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
    
    const uploadFiles = async (messageId: String) => {
      const upload = useUpload(`/api/messages/${messageId}/upload`, {
          multiple: false
      })
      for (const file of selectedFiles.value) {
        await upload(file)
        .then(async () => {
          // console.log(`${file.name} のアップロード成功`);
        })
        .catch((err) => alert('Failed to upload image:\n'+ err.data?.message))
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
        {{ file.name }}
        <UButton @click="removeFile(index)">削除</UButton>
      </li>
    </ul>
    <div>
      <label for="file_select" class="bg-blue-100 text-blue-500 hover:bg-blue-200 hover:text-blue-700 rounded-md px-4 py-2 cursor-pointer">
        ファイルを選択して下さい
        <input type="file"  id="file_select" name="file_select"
                class="hidden" accept="image/*" @change="handleFileSelect" />
      </label>      
    </div>
  </div>
</template>