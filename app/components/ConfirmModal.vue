<script setup lang="ts">
    const emit = defineEmits<{ close: [boolean] }>()
</script>

<template>
  <UModal
    :close="{ onClick: () => emit('close', false) }"
    title="確認"
  >
    <template #footer>
      <div class="flex gap-2">
        <UButton color="neutral" label="取消" @click="emit('close', false)" />
        <UButton label="削除" @click="emit('close', true)" />
      </div>
    </template>
  </UModal>
</template>
