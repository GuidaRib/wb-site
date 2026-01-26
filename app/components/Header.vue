<template>
  <header class="fixed z-[9999] w-full p-10">
    <nav  role="navigation" class="headerMenu flex justify-between gap-40">
      <!-- Desktop menu -->
        <ul class="hidden md:flex justify-end items-center gap-20 text-white text-lg font-semibold">
          <li class="bg-black/60 backdrop-blur-sm hover:bg-accent hover:text-black">
            <NuxtLink :to="{ path: '/', hash: '#ueber-uns' }" class="anchor px-3  block text-nowrap">Über Uns</NuxtLink>
          </li>
           <li class="bg-black/60 backdrop-blur-sm hover:bg-accent hover:text-black">
            <NuxtLink :to="{ path: '/', hash: '#projekt' }" class="anchor px-3 block text-nowrap">Projekt</NuxtLink>
          </li>
            <li class="bg-black/60 backdrop-blur-sm hover:bg-accent hover:text-black">
            <NuxtLink :to="{ path: '/', hash: '#leistungen' }" class="anchor px-3 block">Leistungen</NuxtLink>
          </li>
           <li class="bg-black/60 backdrop-blur-sm hover:bg-accent hover:text-black">
            <NuxtLink :to="{ path: '/', hash: '#team' }" class="anchor px-3 block">Team</NuxtLink>
          </li>
          <li class="backdrop-blur-sm bg-accent text-black hover:bg-black hover:text-white">
            <NuxtLink :to="{ path: '/' }" class="anchor px-6 py-2 block text-nowrap">Sag Hello</NuxtLink>
          </li>
        </ul>
        <ul class="hidden md:flex justify-end items-center gap-20">
          <li>
            <button class="px-6 py-2 backdrop-blur-sm text-black bg-accent hover:bg-black hover:text-white font-semibold text-lg  transition-colors cursor-pointer">
              green
            </button>
          </li>
          <li>
            <button class="px-6 py-2 backdrop-blur-sm text-black bg-accent-yellow hover:bg-black hover:text-white font-semibold text-lg  transition-colors cursor-pointer">
              yellow
            </button>
          </li>
          <li>
            <button class="px-6 py-2 backdrop-blur-sm text-black bg-accent-pink hover:bg-black hover:text-white font-semibold text-lg  transition-colors cursor-pointer">
              pink
            </button>
          </li>
        </ul>

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
