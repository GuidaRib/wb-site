<template>
    <section
    ref="panelMusikfest"
    class="relative min-h-screen overflow-hidden "
    >

    <div ref="mainContent" class="w-full">
        <div class="grid grid-cols-4 ">
           <div class="col-span-2 bg-green-white relative h-screen flex items-center justify-end z-20 grid grid-cols-2">
                <div ref="leftContent" class=" bg-white border-2 border-[#E30512] border-r-0 col-span-1 col-start-2 min-h-[60vh] flex flex-col justify-center">
                    <img src="/mfb/mfb_logo_text.svg" alt="" class="h-40 pt-3">
                    <div ref="text" class=" text text-base font-family-averRegular p-10 ">
                        <p>Das Musikfest Bremen begeistert jeden Sommer mit hochkarätigen Künstlerinnen und Künstlern aus Klassik, Jazz und zeitgenössischer Musik. In einzigartiger Atmosphäre erklingen Konzerte an besonderen Spielorten in Bremen und der Region. Wo Musik Menschen verbindet. </p>
                        <p>Wir von whitebox betreuen das Redesign der Website des Musikfest Bremen – von der konzeptionellen Neuausrichtung über modernes UX- und Webdesign bis zur klaren, nutzerfreundlichen Darstellung von Programm und Marke.</p>

                    </div>
  
                </div>
           </div>
           <div class="col-span-2  h-screen relative flex items-center justify-start z-10 bg-[url('/mfb/mfb_background.jpg')] bg-cover bg-center bg-no-repeat z-30" >
            
             <div  ref="rightContent" class="backdrop-blur-sm bg-white/20 border-2 border-[#E30512] border-l-0 w-auto h-auto  ">
         
            </div>
            <div ref="computerContent" class=" grow -translate-x-1/2 py-10 flex flex-col items-center justify-center relative ">
                <div class="absolute top-10 border-2 border-[#E30512] w-1/2 border-l-0 border-b-0 h-20 pr-40 -translate-x-full z-30">

                </div>
                <img src="/mfb/mfb_computer.png" alt="">
                <div class="absolute bottom-10 border-2 border-[#E30512] w-1/2 border-l-0 border-t-0 h-20 pr-40 -translate-x-full z-30">

                </div>
            </div>
    <!--             <img src="/mfb/mfb_logo.svg" alt="" class="w-1/2 h-auto absolute transform rotate-90 "> -->
           </div>
        </div>
       <div ref="logoCombined" class=" absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center pointer-events-none gap-10 transform rotate-90 -ml-5 z-40">
                <img ref="logoLeft" src="/mfb/mfb_logo.svg" alt="" >
                <img ref="logoRight" src="/mfb/mfb_logo.svg" alt="" class="opacity-0 -rotate-180">
        </div>
    </div>


    </section>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ref, onMounted, onUnmounted, nextTick } from "vue";

gsap.registerPlugin(ScrollTrigger, SplitText);

const panelMusikfest= ref<HTMLElement | null>(null);
const logoCombined = ref<HTMLElement | null>(null);
const leftContent = ref<HTMLElement | null>(null);
const rightContent = ref<HTMLElement | null>(null);
const computerContent = ref<HTMLElement | null>(null);
function syncRightToLeft() {
    if (!leftContent.value || !rightContent.value) return;
    const leftRect = leftContent.value.getBoundingClientRect();
    rightContent.value.style.width = leftRect.width + 'px';
    computerContent.value!.style.height = leftRect.height + 'px';
    rightContent.value.style.height = leftRect.height + 'px';
}
    
let ctx: gsap.Context | null = null;



onMounted(() => {
    nextTick(() => {
        syncRightToLeft();
        window.addEventListener('resize', syncRightToLeft);
    });
    ctx = gsap.context(() => {
        const section = panelMusikfest.value;
        const logoEl = logoCombined.value;

        if (!section ) return;

        // Pin the section for 4 viewport heights
        const pinDuration = window.innerHeight * 4;
        const split = new SplitText(".text", { type: "words" });

        ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: () => `+=${pinDuration}`,
            pin: true,
        });

        // Timeline's scrollTrigger starts before the pin (when section top hits bottom of viewport)
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top bottom', // start before the pin
                end: () => `+=${pinDuration + window.innerHeight}`, // include pre-pin distance
                scrub: true,
            }
        });

        /*        tl.set(logoEl, {autoAlpha: 0});

        tl.fromTo(logoEl, 
        {autoAlpha: 0 , y: 50 },
        {autoAlpha: 1, duration: 0.1, y: 0, ease: 'power3.out' }, 
        0.1);
        */

    }, panelMusikfest.value);
});

onUnmounted(() => {
    ctx?.revert();
    ScrollTrigger.getAll().forEach(t => t.kill());
    window.removeEventListener('resize', syncRightToLeft);
});
</script>

<style scoped>
/* Initial states now managed by GSAP for reliability */
</style>

