<template>
  <section
    id="home"
    ref="sectionEl"
    class="flex items-center bg-white min-h-screen justify-center relative"
  >
  <div class="flex flex-col items-center gap-8">
    <div>
      <div class="flex flex-row gap-2 items-end justify-center split">
      <img src="/title/logo/wb-logo-1.svg" alt="Logo 1" class="logo h-22" style="opacity: 0;" />
      <img src="/title/logo/wb-logo-2.svg" alt="Logo 2" class="logo h-30" style="opacity: 0;" />
      <img src="/title/logo/wb-logo-3.svg" alt="Logo 3" class="logo h-28" style="opacity: 0;" />
      <img src="/title/logo/wb-logo-4.svg" alt="Logo 4" class="logo h-26" style="opacity: 0;" />
      <img src="/title/logo/wb-logo-5.svg" alt="Logo 5" class="logo h-22 -ml-2" style="opacity: 0;" />
      <img src="/title/logo/wb-logo-6.svg" alt="Logo 6" class="logo h-28" style="opacity: 0;" />
      <img src="/title/logo/wb-logo-7.svg" alt="Logo 7" class="logo h-22 -ml-1" style="opacity: 0;" />
      <img src="/title/logo/wb-logo-8.svg" alt="Logo 8" class="logo h-22 -ml-4" style="opacity: 0;" />
      </div>
    </div>
    <h1 ref="subtitle" class=" text-5xl" style="opacity: 0;">Strategische Marketingkommunikation</h1>
    <video ref="flyer" src="/title/white-box.mp4" class="absolute top-1/2 left-1/2 -translate-1/2 opacity-0" autoplay loop muted></video>
    <div ref="triangle" class="w-0 h-0 border-l-38 border-r-38 border-b-58 border-l-transparent border-r-transparent border-b-accent opacity-0" style="opacity: 0; transform: translateY(100%);"></div>
  </div>
  <div>
 
  </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const sectionEl = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

const subtitle = ref<HTMLElement | null>(null);
const triangle = ref<HTMLElement | null>(null);
const flyer = ref<HTMLElement | null>(null);

async function initTimeline() {
  
  ctx = gsap.context(() => {

  const section = sectionEl.value;
  if (!section) return;

  const split = new SplitText(".split", { type: "words" });
        
  // Timeline that plays on its own
  const tl = gsap.timeline({ paused: true });

  // Set initial states
  tl.set(subtitle.value, { autoAlpha: 0, y: window.innerHeight });
  tl.set(flyer.value, { autoAlpha: 0, y: window.innerHeight });
  tl.set(triangle.value, { autoAlpha: 0, y: window.innerHeight });
  tl.set(".logo", { autoAlpha: 0, y: 120, skewY: 6 });
  
  tl.add("start", 0);

  // Flyer animation
  tl.fromTo(flyer.value, 
    { autoAlpha: 0, y: window.innerHeight },
    { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
    "start"
  );

  // Triangle animations
  tl.fromTo(triangle.value, 
    { autoAlpha: 0, y: window.innerHeight },
    { autoAlpha: 1, y: 20, duration: 0.8, ease: "power2.out" }, 
    "start+=0.3"
  );
  
  tl.to(triangle.value, 
    { rotate: 180, duration: 0.6, ease: "power2.inOut" },
    "start+=0.8"
  );


  tl.to(triangle.value, 
  { y: 200, duration: 0.6, ease: "power2.inOut" },
  "start+=1.6");

    tl.to(flyer.value, 
    { y: 180, duration: 0.6, ease: "power2.inOut" }, 
     "start+=1.6");

   


  tl.to(subtitle.value, {
    autoAlpha: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out",
  }, "start+=1.8");

  tl.fromTo(".logo", 
    { y: 120, skewY: 6, autoAlpha: 0 }, 
    { y: 0, skewY: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out", stagger: { each: 0.06, from: "center" } }, 
    "start+=2.2"
  );
 
  // ScrollTrigger to restart animation when entering section
  ScrollTrigger.create({
    trigger: section,
    start: 'top center',
    onEnter: () => tl.restart(),
    onEnterBack: () => tl.restart(),
  });

  tl.to(triangle.value, 
  { y: window.innerHeight, duration: 0.8, ease: "power2.in" },
  "start+=3");

  tl.to(flyer.value, 
  { y: window.innerHeight + 20, duration: 0.8, ease: "power2.in" }, 
    "start+=3");

   


  }, sectionEl.value);
};
  onMounted(() => {
    initTimeline();
  });
  
  onUnmounted(() => { 
    try { ctx?.revert(); } catch (e) {}  

  })


</script>

<style scoped>
section {
  overflow: hidden;
}
</style>
