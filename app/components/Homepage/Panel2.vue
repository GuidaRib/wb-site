<template>
      <section id="panel2" ref="sectionEl" class="flex bg-purple-500 min-h-screen text-white items-center">
        <div class="p-10 flex flex-col gap-10 lg:gap-20">
            <div class="p1 text-4xl lg:text-[6rem] split font-bold ">
                <span class="phrases cursor-pointer hover:bg-orange-400">
                deine Marke.
            </span>
            </div>
            <div class="p2 text-4xl lg:text-[6rem] split font-bold ">
                <span class="phrases cursor-pointer hover:bg-orange-400">unsere Idee.</span>
            </div>
            <div class="p3 text-4xl lg:text-[6rem] split font-bold ">
                
                <span class="phrases cursor-pointer hover:bg-orange-400">gemeinsam gestalten.</span>
            </div>
        </div>
      </section>
</template>

<script lang="ts" setup>

import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(SplitText, ScrollTrigger);

const sectionEl = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null
let tl: gsap.core.Timeline | null = null

const originalPhrases: string[]  = [
    'deine Marke.',
    'unsere Idee.',
    'gemeinsam gestalten.'
]

const phrases: string[]  = [
    'mega stark',
    'kreativ kompetent',
    'digital dynamisch',
    'perfekt präzise',
    'immer innovativ',
    'absolut authentisch',
    'richtig relevant',
    'mutig modern',
    'clever cool',
    'super strategisch'
];


const handleMouseEnter = (index: number) => {

    const phraseElements = document.querySelectorAll('.phrases');
    if (phraseElements[index]) {
        const pick = phrases[Math.floor(Math.random() * phrases.length)] ?? null;
        phraseElements[index].textContent = pick;
    }
};

const handleMouseLeave = (index: number) => {
    const phraseElements = document.querySelectorAll('.phrases');
    if (phraseElements[index]) {
        phraseElements[index].textContent = originalPhrases[index] ?? null;
    }
};


async function initTimeline() {
    // cleanup any existing context first
    try { ctx?.revert(); } catch (e) {}

    await nextTick();

    const section = sectionEl.value;
    if (!section) return;

  
    ctx = gsap.context(() => {


    const split = new SplitText(".split", { type: "words" });
    
    const splitElements = document.querySelectorAll('.split');
    splitElements.forEach(el => new SplitText(el, { type: "words" }));

        // Create a scrubbed timeline that runs while the section moves from top->center to bottom->top
        tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top center',
                end: 'top top',
                scrub: true,

            },
        });

        // animate words; using 'none' easing keeps the scrub linear
        tl.from(split.words, {
            y: 100,
            autoAlpha: 0,
            stagger: 0.05,
            ease: 'none',
    
        });
   
    }, section);
    /* const pinDuration = window.innerHeight * 3; // Pin for 3 viewport heights
    const panel2 = document.getElementById('panel2') as HTMLElement;
    if (!panel2) {
        console.warn('Panel2: no panel2 element found. Aborting pin setup.');
        return;
    }
    const panel2Pin = ScrollTrigger.create({
        trigger: panel2,
        start: 'top top',
        end: () => `+=${pinDuration}`,
        pin: true,
        pinSpacing: true,
        scrub: false,
        anticipatePin: 1,
 
    }); */
    const phraseElements = document.querySelectorAll('.phrases');
    phraseElements.forEach((el, index) => {
        el.addEventListener('mouseenter', () => handleMouseEnter(index));
        el.addEventListener('mouseleave', () => handleMouseLeave(index));
    });
};

  onMounted(() => {
    initTimeline();
  });
  
  onUnmounted(() => { 
    try { ctx?.revert(); } catch (e) {}  
  })

     
</script>

<style>

</style>