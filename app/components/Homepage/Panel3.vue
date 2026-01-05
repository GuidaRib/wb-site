<template>
  <section id="panel3" ref="panelEl" class="relative bg-emerald-200">
    <!-- Floating parallax divs -->
    <div class="pointer-events-none absolute inset-0 z-10">
      <div class="floating f1 absolute w-48 h-48 rounded-lg opacity-90 bg-red-400 top-[20%] left-[10%]"></div>
      <div class="floating f2 absolute w-56 h-56 rounded-lg opacity-90 bg-blue-400 top-[50%] left-[30%]"></div>
      <div class="floating f3 absolute w-40 h-40 rounded-lg opacity-90 bg-yellow-400 top-[70%] left-[60%]"></div>
    </div>

    <!-- Title overlay -->
    <div class="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
      <h1 class="text-5xl font-bold text-white">Panel 3 Title</h1>
    </div>

    <!-- Horizontal panels -->
    <div class="panels flex  h-screen">
      <div class="panel min-w-full h-screen flex items-center justify-center bg-red-200">
        panel1
      </div>
      <div class="panel min-w-full h-screen flex items-center justify-center bg-blue-500">
        panel2
      </div>
      <div class="panel min-w-full h-screen flex items-center justify-center bg-emerald-400">
        panel3
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, onUnmounted, ref } from "vue";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{ main?: HTMLElement | null }>();
const panelEl = ref<HTMLElement | null>(null);

onMounted(() => {
  const section = panelEl.value;
  if (!section) return;

  const panelsContainer = section.querySelector<HTMLElement>(".panels");
  if (!panelsContainer) return;

  const panels = Array.from(panelsContainer.children) as HTMLElement[];
  const scrollLength = panelsContainer.scrollWidth

  // Ensure panels fill viewport
  panels.forEach(p => {
    p.style.minWidth =  `${window.innerWidth}px`;
    p.style.height = `${window.innerHeight}px`;
  });

  const ctx = gsap.context(() => {
      const totalPanels = panels.length;

    // Horizontal scroll animation
       gsap.to(panelsContainer, {
        xPercent: -100 * (totalPanels - 1),
        ease: "bounce.out",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${window.innerWidth * (totalPanels - 1)}`, // ← key change
          pin: true,
          scrub: true,
          anticipatePin: 1,
          
        },
      }); 


    // Parallax floats (reduced repetition)
    const floats = [
      { sel: ".f1", x: 200 },
      { sel: ".f2", x: -300 },
      { sel: ".f3", x: 420 },
    ];

    floats.forEach(({ sel, x }) => {
      const el = section.querySelector<HTMLElement>(sel);
      if (!el) return;
      gsap.to(el, {
        x,
        scale: 3,
        ease: "bounce.out",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${scrollLength}`,
          scrub: true,
        
        },
      });
    });
  }, section);

  onUnmounted(() => { 
    try { ctx?.revert(); } catch (e) {}  
    try { ScrollTrigger.getAll().forEach((t) => t.kill()) } catch (e) {}
   // check here how to restart
  })
});
</script>
