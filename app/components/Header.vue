<template>
  <div class="bg-stone-300">
    <div class="h-[40px] flex items-center" >
      <div class="h-full">
        <img src="/img/pyramid.svg" class="h-full p-1" alt="ci" />
      </div>
      <span class="text-cyan-900 text-xl md:text-3xl font-brand">
        <nuxt-link to="/">andante</nuxt-link>
      </span>
      <div class="flex flex-auto justify-end items-center px-2">
        <!-- <ColorModeButton></ColorModeButton> -->
        <LoginStatus />
      </div>
    </div>
  </div>
  <nav class="bg-gradient-to-b from-stone-500 to-stone-700 flex justify-start text-white text-base font-semibold">
    <div class="px-4 py-1 hover:bg-gray-50 hover:text-orange-500"><nuxt-link to="/">ホーム</nuxt-link></div>
  </nav>
</template>
  