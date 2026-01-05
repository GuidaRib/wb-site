<template>
  <header class="fixed z-[9999] w-full bg-transparent  md:my-5 p-2 ">
    <nav  role="navigation" class="">
      <!-- Desktop menu -->
      <div class="hidden md:flex gap-5 w-full justify-between px-10  py-4 mx-auto text-xl max-w-prose    color-white rounded-full backdrop-blur bg-black bg-opacity-50">
        <NuxtLink to="/" class="anchor hover:underline">Start</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#panel2' }" class="anchor hover:underline">Über uns</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#pinnedSection' }" class="anchor hover:underline">Leistungen</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#panel4' }" class="anchor hover:underline">Projekt</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#panel5' }" class="anchor hover:underline">Team</NuxtLink>
         <NuxtLink :to="{ path: '/svg' }" class="anchor hover:underline">SVG</NuxtLink>
      </div>

      <!-- Mobile hamburger button -->
      <button @click="isOpen = !isOpen" class="md:hidden w-12 text-white bg-black rounded-full h-12 flex items-center justify-center absolute right-4" aria-label="Toggle menu">
        <Icon name="mdi:hamburger-menu" size="36"  />
      </button>
    </nav>

    <!-- Mobile menu -->
    <div v-if="isOpen" class="md:hidden p-4 bg-black color-white rounded-3xl ">
      <a href="#panel2" @click="isOpen = false" class="block py-2 anchor">Über uns</a>
      <a href="#pinnedSection" @click="isOpen = false" class="block py-2 anchor">Leistungen</a>
      <a href="#panel4" @click="isOpen = false" class="block py-2 anchor">Projekt</a>
      <a href="#panel5" @click="isOpen = false" class="block py-2 anchor">Team</a>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
</script>
