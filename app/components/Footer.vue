<template>
    <nav class="bg-black w-full relative flex justify-between items-center">
      <div class=" p-10 flex gap-10 items-center text-white ">
              <div class="text-white text-sm">© Whitebox
          2025
        </div>
        <NuxtLink to="/impressum">Impressum</NuxtLink>
        <NuxtLink to="/datenschutz">Datenschutz</NuxtLink>
        <NuxtLink to="/kontakt">Kontakt</NuxtLink>
      </div>



      <div class=" p-10 flex gap-10 items-center text-white ">
       <NuxtLink to="https://instagram.com" target="_blank">
         <Icon name="mdi:instagram" size="32"/>
       </NuxtLink>

       <NuxtLink to="https://linkedin.com" target="_blank">
         <Icon name="mdi:linkedin" size="32"/>
       </NuxtLink>

       <NuxtLink to="https://facebook.com" target="_blank">
         <Icon name="mdi:facebook" size="32"/>
       </NuxtLink>
      </div>
      </nav>
    </template>

    <script lang="ts" setup>

    </script>

    <style>


</style>