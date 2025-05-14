<script setup lang="ts">
useSeoMeta({
  title: 'Andante',
  description: 'A message board built together with customers.'
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <UApp>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>
