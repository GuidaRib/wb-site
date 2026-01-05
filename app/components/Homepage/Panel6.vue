<template>
  <section id="pinnedSection" ref="sectionEl" class="relative h-screen bg-white overflow-hidden border-b-2 border-black">
        <!-- Centered title -->
    <div class="absolute inset-0 z-20 flex items-start pt-28 lg:pt-40 justify-center pointer-events-none">
      <h1 class="text-3xl lg:text-5xl font-bold text-black px-4">Wir bringen eure Marke in Bewegung.</h1>
    </div>
    <!-- Floating elements -->
    <div class="relative mt-60  h-full w-full pointer-events-none">
    <div class="float f1 absolute p-4 px-20 text-white bg-red-400 rounded-lg opacity-90 top-[10%] right-[55%]">Text 1</div>
    <div class="float f2 absolute p-4 px-20 text-white bg-blue-400 rounded-lg opacity-90 top-[20%] -right-[10%]">Text 2</div>
    <div class="float f3 absolute p-4 px-20 text-white bg-green-400 rounded-lg opacity-90 top-[0%] md:top-[50%] right-[30%]">Text 3</div>
    <div class="float f4 absolute p-4 px-20 text-white bg-yellow-500 rounded-lg opacity-90 top-[40%] -right-[25%]">Text 4</div>
    <div class="float f5 absolute p-4 px-20 text-white bg-purple-500 rounded-lg opacity-90 top-[50%] -right-[5%]">Text 5</div>
    <div class="float f6 absolute p-4 px-20 text-white bg-pink-500 rounded-lg opacity-90 top-[60%] right-[10%]">Text 6</div>
    <div class="float f7 absolute p-4 px-20 text-white bg-indigo-500 rounded-lg opacity-90 top-[30%] right-[5%]">Text 7</div>

    </div>


  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionEl = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

async function initTimeline() {
  // cleanup any existing context first
  try { ctx?.revert(); } catch (e) {}

  await nextTick();
  // small delay to allow browser to stabilize layout after client navigation
  await new Promise((r) => setTimeout(r, 40));

  const section = sectionEl.value;
  if (!section) return;

  const scrollLength = window.innerHeight * 5; // how long it stays pinned

  ctx = gsap.context(() => {
    // Create a timeline for the floating animations
    const tl = gsap.timeline({ paused: true });
    
    // Floating elements .f1 through .f7 move from right to left with staggered distances
    const floatSelectors = [".f1", ".f2", ".f3", ".f4", ".f5", ".f6", ".f7"];
    const base = 300; // base distance in px
    floatSelectors.forEach((sel, i) => {
      const el = section.querySelector<HTMLElement>(sel);
      if (!el) return;

      // Each element moves further to the left; tweak multiplier for depth effect
      const x = -(base + i * 120);

      tl.to(el, {
        x,
        ease: "bounce.out",
        duration: 1,
      }, 0); // start all at the same time
    });

    // Pin the section and control the timeline
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${scrollLength}`,
      pin: true,
      scrub: true,
      animation: tl,
    });

    // ensure ScrollTrigger recalculates positions
    try { ScrollTrigger.refresh(); } catch (e) {}
  }, section);
}

onMounted(() => {
  // initialize when the component mounts
  initTimeline();
});

// Recreate timeline when navigating to pages containing this component via client-side nav
const route = useRoute();
watch(() => route.fullPath, () => {
  // small timeout so incoming component has time to mount
  setTimeout(() => initTimeline(), 60);
});

onUnmounted(() => { 
  try { ctx?.revert(); } catch (e) {}  
  try { ScrollTrigger.getAll().forEach((t) => t.kill()); } catch (e) {}
});
</script>

<style scoped>

@keyframes gentleFloat {
  0% { transform: translateY(0px); }
  100% { transform: translateY(15px); }
}
</style>
