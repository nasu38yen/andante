<script setup lang="ts">
import { string } from 'valibot';
  const props = defineProps<{
      title: string;
      message: string;
  }>();
  const emit = defineEmits<{ close: [boolean] }>()
</script>

<template>
  <UModal :close="{ onClick: () => emit('close', false) }" :title="props.title">
    <template #body>
      {{ props.message }}
    </template>
    <template #footer>
      <div class="flex gap-2">
        <UButton  color="neutral" variant="outline" label="取消" @click="emit('close', false)" />
        <UButton label="実行" @click="emit('close', true)" />
      </div>
    </template>
  </UModal>
</template>
