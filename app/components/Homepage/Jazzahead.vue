<template>
    <section
    ref="panelJazz"
    class="relative min-h-screen overflow-hidden bg-white"
    >
    <!-- Background image panel -->
    <div
        ref="background"
        class="absolute right-0 w-1/2 h-screen z-0"
    >
        <img
        src="/jazzahead/ja_background.jpg"
        class="w-full h-full object-cover object-right"
        alt=""
        />
    </div>

    <!-- Foreground / overlay panel -->
    <div
      
        class="absolute z-10 translate-y-1/4 "
    >
        <div class="grid grid-cols-4 gap-5">
            <div class="">
                
            </div>
            <div ref="content" class="col-span-2 grid grid-cols-2 bg-white justify-between border-2 p-5 pb-10">
                <div class="w-34 break-all text-8xl font-family-averBlack">
                    2026
                </div>
                <img
                    src="/jazzahead/ja_poster2026.jpg"
                    class="object-contain w-full h-full poster drop-shadow-2xl"
                    alt="Jazzahead 2026 Poster"
                />
            </div>
        <div ref="text" class="text text-base max-w-72 font-family-averRegular">
           <div>
            <p>jazzahead! ist seit 20 Jahren als Fachmesse und Festival international bekannt.  Die Besucher kommen aus 64 Ländern – schwerpunktmäßig aus dem europäischen Ausland.</p> 

            <p><span class="font-family-averBold">Wir begleiten das Festival und die Fachmesse jazzahead! seit 2026</span> mit jählich neuem Erscheinungsbild und einem gestalterischen <span class="font-family-averBold">Rundum-Paket für sämtliche Maßnahmen der Kampagne.</span> </p>

            <div  class="relative z-10">
                <div ref="line" class="border-l h-32">

                </div>
                <img ref="posterClubnight" src="/jazzahead/ja_posterClubnight.jpg" alt="Jazzahead Poster Clubnight" class="absolute -mt-6 -ml-20 w-full h-auto max-w-40 ">
            </div>
           </div> 
        </div>
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

const panelJazz = ref<HTMLElement | null>(null);
const background = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);
const line = ref<HTMLElement | null>(null);
const posterClubnight = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;

onMounted(() => {
  ctx = gsap.context(() => {
    const section = panelJazz.value;
    const bg = background.value;
    const fg = content.value;
    const ln = line.value;
    const pCn = posterClubnight.value;


    if (!section || !bg || !fg) return;



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

       // Initial states
        tl.set(bg, { xPercent: 0, opacity: 0 });
        tl.set(fg, { opacity: 0 });
        tl.set(ln, { height: 0 });
        tl.set(pCn, { opacity: 0 });

        // Explicit durations so the scrubbed timeline maps clearly to scroll
        const fadeDur = 0.08; // bg fade duration (relative timeline units)
        const slideDur = 0.13; // bg slide duration
        const fgDur = 0.05;   // foreground fade duration

        // 1) bg fades in
        tl.to(bg, { opacity: 1, xPercent: -100,ease: 'none', duration: fadeDur }, 0);
        // 2) bg slides left after fade completes
        //tl.to(bg, { , ease: 'none', duration: slideDur }, fadeDur);
        // 3) foreground fades in after slide completes
        tl.to(fg, { opacity: 1,y: -40, ease: 'none', duration: fgDur }, fadeDur);
        // 4) poster pops in shortly after foreground
        tl.from('.poster', { opacity: 0, y: 40, duration: 0.1 }, fadeDur);
        // 5) text fades in
        //tl.to(txt, { opacity: 1, ease: 'none', duration: fgDur }, fadeDur * 2);
        // Split text animation
     
         tl.from(split.words, {
            y: 100,
            autoAlpha: 0,
            stagger: {
                amount: 0.2,
                from: "start"
            },
            ease: "power2.out",
            duration: 0.08,
            }, fadeDur * 2);

        // 6) line grows
        tl.to(ln, { height: 128, ease: 'none', duration: 0.1 }, fadeDur * 3);
        // 7) posterClubnight pops in
        tl.from(pCn, { opacity: 0, y: 40, duration: 0.1 }, fadeDur * 3);

  }, panelJazz.value);
});

onUnmounted(() => {
  ctx?.revert();
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

