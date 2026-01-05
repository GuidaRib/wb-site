<template>
  <div ref="sectionEl" class="h-screen relative w-screen">
    <div v-if="variant === 'h'" class="h-screen relative w-screen">
      <div class="w-full h-full relative" >
        <img src="/firstimage.jpg" class="w-full h-full absolute top-0 left-0" alt="before">
      </div>
      <div class="w-full h-full afterImage translate-x-full absolute top-0 left-0 overflow-hidden">
        <img src="/secondimage.jpg" class="w-full h-full absolute top-0 left-0 -translate-x-full" alt="after">
      </div>
    </div>
    <div v-else>
      <div class="w-full h-screen relative" >
        <img src="/cups1.jpg" class="w-full h-full object-cover absolute top-0 left-0" alt="before">
      </div>
      <div class="w-full h-full afterImage absolute top-0 left-0 overflow-hidden ">
        <img src="/cups2.png" class="w-full h-full absolute top-0 left-0 translate-y-full object-cover" alt="after">
      </div>
    </div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, onMounted } from 'vue'
    import { gsap } from 'gsap'
    import { ScrollTrigger } from 'gsap/ScrollTrigger'
    import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

    const props = defineProps<{
      variant: 'h' | 'v'
    }>()

    gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)
    const sectionEl = ref<HTMLElement | null>(null)
    let ctx: gsap.Context | null = null
    let tl: gsap.core.Timeline | null = null

    async function initTimeline() {
    // cleanup any existing context first
    try { ctx?.revert(); } catch (e) {}

    await nextTick();

          const section = sectionEl.value
          if (!section) return

          tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "center center",
          // makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
          end: () => "+=" + section.offsetHeight, 
          scrub: true,
          pin: true,
          anticipatePin: 1
        },
        defaults: {ease: "none"}
      });
    // animate the container one way...
    if(props.variant === "h"){
     tl.fromTo(section.querySelector(".afterImage"), { xPercent: 100, x: 0}, {xPercent: 0})
      // ...and the image the opposite way (at the same time)
      .fromTo(section.querySelector(".afterImage img"), {xPercent: -100, x: 0}, {xPercent: 0}, 0);
    } else {
      tl.fromTo(section.querySelector(".afterImage"), { yPercent: -100, y: 0}, {yPercent: 0})
      .fromTo(section.querySelector(".afterImage img"), {yPercent: 100, y: 0}, {yPercent: 0}, 0);
      
      // Update ScrollTrigger end value for vertical scroll

    }

  };

  onMounted(() => {
    initTimeline();
  });
  
  onUnmounted(() => { 
    try { ctx?.revert(); } catch (e) {}  
  })
</script>
