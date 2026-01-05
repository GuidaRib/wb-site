<template>
  <section
    id="home"
    ref="sectionEl"
    class="flex items-center bg-white min-h-screen justify-center relative"
  >
    <h1 class="text-5xl lg:text-[7rem] split self-center">whitebox</h1>
    <div class="absolute bottom-10 animate-bounce">↓ Scroll runter</div>
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
let tl: gsap.core.Timeline 

async function initTimeline() {
    // cleanup any existing context first
  try { ctx?.revert(); } catch (e) {}

  await nextTick();

  const section = sectionEl.value;
  if (!section) return;

  ctx = gsap.context(() => {
  const split = new SplitText(".split", { type: "chars" });

    // Create a timeline for the text animation
  tl = gsap.timeline({ paused: true });
    tl.from(split.chars, {
      y: 100,
      autoAlpha: 0,
      stagger: {
        amount: 0.5,
        from: "random"
      },
      ease: "power2.out",
      duration: 1,
    });

    // ScrollTrigger to control the animation
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      onEnter: () => tl.restart(), // play when entering from top
      onEnterBack: () => tl.restart(), // play again when scrolling back
      onLeave: () => tl.reverse(),
      onLeaveBack: () => tl.reverse(),
    });
  }, section);
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
