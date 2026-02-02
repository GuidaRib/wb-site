<template>
    <section id="panel2" ref="sectionEl" class="relative flex bg-accent/20 min-h-screen text-black justify-end flex-col p-10 gap-10">
        <div class=" flex flex-col gap-10 z-10 font-family-sineMedium self-start">
            <div class="p1 text-5xl lg:text-8xl split font-medium">
                <span>deine </span><span class="phrases1 cursor-pointer hover:bg-accent">Marke.</span>
            </div>
            <div class="p2 text-5xl lg:text-8xl split font-medium">
                <span class="phrases2 cursor-pointer hover:bg-accent">unsere Idee.</span>
            </div>
            <div class="p3 text-5xl lg:text-8xl split font-medium ">
                <span class="phrases3 cursor-pointer hover:bg-accent">gemeinsam gestalten.</span>
            </div>
        </div>
        <div ref="mainText" class="self-end max-w-3xl pb-20">
            <p class="text-xl">Wir entwickeln starke Marken und kreative Designlösungen für digitale und printbasierte Medien.
Vom Webdesign über Verpackungen bis zu durchdachten Kampagnen bieten wir alles aus einer Hand.</p>
        </div>
    </section>
</template>

<script lang="ts" setup>

import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(SplitText, ScrollTrigger);

const sectionEl = ref<HTMLElement | null>(null);
const mainText = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null
let tl: gsap.core.Timeline | null = null


const originalPhrases: string[]  = [
    'Marke.',
    'unsere Idee.',
    'gemeinsam gestalten.'
];

const hoverPhrases: string[] = [
    'Brand',
    'unser Know-How',
    'zusammen halten.'
];

const handleMouseEnter = (index: number) => {
    const el = document.querySelector(`.phrases${index+1}:nth-child(2)`);
    console.log(el)
    if (el) {
        el.textContent = hoverPhrases[index];
    }
};

const handleMouseLeave = (index: number) => {
    const el = document.querySelector(`.phrases${index+1}:nth-child(2)`);
    console.log(el)
    if (el) {
        el.textContent = originalPhrases[index];
    }
};


async function initTimeline() {
    // cleanup any existing context first
    try { ctx?.revert(); } catch (e) {}

    await nextTick();

    const section = sectionEl.value;
    if (!section) return;

  
    ctx = gsap.context(() => {


    const split = new SplitText(".split", { type: "lines" });


        // Create a scrubbed timeline that runs while the section moves from top->center to bottom->top
        tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top center',
                end: 'top -100',
                scrub: true,

            },
        });
        
        // animate words; using 'none' easing keeps the scrub linear
        tl.from(split.lines, {
            x: -100,
            autoAlpha: 0,
             stagger: { amount: 0.26, from: "start" },
            ease:  "power2.out",
    
        });

        tl.fromTo(mainText.value, 
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, duration: 1 }, '+=1'
        );

    }, section);


    // Add hover listeners for each phrase
    [1,2,3].forEach((i, idx) => {
        const el = document.querySelector(`.phrases${i}:nth-child(2)`);
        console.log(el)
        if (el) {
            el.addEventListener('mouseenter', () => handleMouseEnter(idx));
            el.addEventListener('mouseleave', () => handleMouseLeave(idx));
        }
    });
};

  onMounted(() => {
    initTimeline();
  });
  
  onUnmounted(() => { 
    try { ctx?.revert(); } catch (e) {}  
  })

     
</script>
