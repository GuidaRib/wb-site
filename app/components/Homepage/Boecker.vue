<template>
    <section
    ref="panelBoecker"
    class="relative h-screen overflow-hidden p-20 grid grid-cols-7"
    >
    <div class="flex flex-row mt-auto justify-start  items-start gap-2 z-20">

        <div ref="leftElement" class="left-20 p-4 bg-[#B687FF] rounded-bl-3xl min-w-36">
            <img src="/boecker/bo_element_left.png" alt="">
        </div>
        <div ref="leftElementText"class="flex flex-row gap-2 ">
            <div ref="line2" class="border-t w-20">

            </div>
            <span ref="textClp" class="text-base font-family-averRegular uppercase -mt-1">
                Sauerteig Aromen
            </span>

        </div>
    </div>
    <div ref="mainContent" class="overflow-hidden col-span-5 col-start-2 flex flex-col justify-end ">
        <div class="relative overflow-hidden"> 
        <img src="/boecker/bo_laptop_n.png" alt="" class="relative z-20  h-auto w-[64vw] mx-auto ">

      <img ref="website" src="/boecker/bo_website.jpg" class="w-[48vw] h-auto absolute left-1/2 top-20 transform -translate-x-1/2" alt=""> 
        </div>
    

    </div>
    <div class="cold-span-2 -ml-20 py-40 flex flex-col items-start  z-20">
        <div ref="text" class="text w-full text-base font-family-averRegular">
            <p>Die Ernst Böcker GmbH ist ein traditionsreiches Familienunternehmen und international anerkannter Spezialist Sauerteig-Produkte und Fermentations-lösungen. Seit Generationen steht Böcker für höchste Qualität, handwerkliche Kompetenz und Innovationskraft.</p>
            <p>Wir sind <span class="font-family-averBold">ganzheitlicher Marketing-partner</span> von BÖCKER. Vom <span class="font-family-averBold">strategischen Brand-Design</span> über eine moderne Webseite und einen leistungsstarken Online-Shop bis hin zu wirkungsvoller Social-Media-Kommunikation sorgen wir für einen konsistenten und starken Markenauftritt.</p>

                        
        </div>
        <div ref="line" class="border-l">

        </div>
    </div>
    </section>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ref, onMounted, onUnmounted } from "vue";

gsap.registerPlugin(ScrollTrigger, SplitText);

const panelBoecker= ref<HTMLElement | null>(null);
const mainContent= ref<HTMLElement | null>(null);
const website= ref<HTMLElement | null>(null);
const text= ref<HTMLElement | null>(null);
const line= ref<HTMLElement | null>(null);
const leftElement= ref<HTMLElement | null>(null);
const leftElementText= ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;



onMounted(() => {
ctx = gsap.context(() => {
const section = panelBoecker.value;
const content = mainContent.value;
const site = website.value;
const textEl = text.value;
const textLine = line.value;
const leftEl = leftElement.value;
const leftText = leftElementText.value;

    if (!section || !content || !site) return;

        // Pin the section for 4 viewport heights
        const pinDuration = window.innerHeight * 4;
        const split = new SplitText(textEl, { type: "words" });

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

        tl.set(content, {height: 0, y: 50});
        tl.set(site, {y: 0, opacity: 0});
        tl.set(leftEl, {x: -100, opacity: 0});

        tl.fromTo(content, 
        {height: 0, y: 200},
        {height: 'auto', y: 0, ease: 'power3.out', duration: 0.35 }, 0.1);

        tl.fromTo(site, 
        {opacity: 0,}, 
        {opacity: 1, duration: 0.5}, 0.4);

        tl.fromTo(site, 
        { y: 0 },
        { y: -3000, ease: 'power3.in', duration: 2.5 }, 0.5);

        tl.from(split.words, {
            y: 100,
            autoAlpha: 0,
            stagger: {
                amount: 0.1,
                from: "start"
            },
            ease: "power2.out",
            duration: 0.08,
            }, 0.6);

         // 6) line grows
        tl.to(textLine, { height: 80, ease: 'none', duration: 0.1 }, 0.7);

        tl.fromTo(leftEl, 
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, ease: 'power3.out', duration: 0.35 }, 0.6);

        tl.fromTo(leftText, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power3.out', duration: 0.35 }, 0.6);

    }, panelBoecker.value);
});

onUnmounted(() => {
  ctx?.revert();
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<style scoped>
/* Initial states now managed by GSAP for reliability */
</style>

