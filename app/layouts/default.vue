<template>
    <div class="bg-orange-50">
        <div class="flex flex-col">
            <div class="sticky top-0">
                <Header />
            </div>
            <div class="container mx-auto max-w-screen-xl px-2"> 
                <slot />
            </div>        
            <div class="pt-2">
                <Footer />
            </div>
        </div>
    </div>
</template>
  