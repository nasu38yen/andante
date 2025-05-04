<template>
    <div class="bg-orange-50">
        <div class="flex flex-col">
            <div class="sticky top-0">
                <Header />
            </div>
            <UContainer>
                <slot />
            </UContainer>
            <div class="pt-2">
                <Footer />
            </div>
        </div>
    </div>
</template>
  