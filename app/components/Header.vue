<template>
  <header class="fixed z-[9999] w-full p-10">
    <nav  role="navigation" class="">
      <!-- Desktop menu -->
        <ul class="hidden md:flex justify-end items-center gap-20 ">
          <li>
            <NuxtLink :to="{ path: '/', hash: '#ueber-uns' }" class="anchor hover:underline">Über Uns</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="{ path: '/', hash: '#projekt' }" class="anchor hover:underline">Projekt</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="{ path: '/', hash: '#leistungen' }" class="anchor hover:underline">Leistungen</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="{ path: '/', hash: '#team' }" class="anchor hover:underline">Team</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="{ path: '/kontakt' }" class="anchor hover:underline bg-accent hover:bg-accent-dark hover:text-white p-2">Sag Hello</NuxtLink>
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
