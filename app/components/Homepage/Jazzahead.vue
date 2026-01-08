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

    <!-- Arrow / overlay panel -->
    <div ref="arrow" class="z-20 absolute left-0 top-1/2 -translate-y-1/2  h-3/5 ">
        <img src="/jazzahead/ja_arrow.png " alt="arrow" class="w-full h-full object-contain" />

    </div>

    <!-- Foreground / overlay panel -->
    <div
      
        class="absolute z-10 translate-y-2/6  w-full "
    >
        <div class="grid grid-cols-4 gap-5">
            <div class="">
                
            </div>
            <div ref="content" class="col-span-2 grid grid-cols-2 bg-white justify-between border-2 p-5 ">
                <div  class="flex justify-between flex-col ">
                    <span ref="year" class="w-34 break-all text-8xl font-family-averBlack">2026</span> 
                    <div class="relative ">
                        <span ref="textClp" class="text-base font-family-averRegular">CLP</span>
                        <div ref="line2" class="border-l mb-8"></div>
                        <img ref="smallposter1" src="/jazzahead/ja_clp.png" alt="" class="h-24 smallposter">
                        <div ref="smallposterWrap" class="flex gap-20 absolute h-24 pr-20 bottom-0 flex-row-reverse -translate-x-full">
                            <img ref="smallposter2" src="/jazzahead/ja_clp_big.png"  alt="" class="smallposter">
                            <img ref="smallposter3" src="/jazzahead/ja_beer.png" alt="" class="smallposter">
                            
                        </div>
                        
                    </div>
                 
                </div>
                <div ref="posterContainer" class="relative col-span-1  w-full h-[70vh]">
                    <img
                        src="/jazzahead/ja22-poster.jpg"
                        class="absolute object-contain w-full h-full poster shadow-lg "
                        alt="Jazzahead 2026 Poster"
                    />
                    <img
                        src="/jazzahead/ja23-poster.jpg"
                        class="absolute object-contain w-full h-full poster shadow-lg "
                        alt="Jazzahead 2026 Poster"
                    />
                    <img src="/jazzahead/ja24-poster.jpg" alt="Jazzahead 2025 Poster" class="absolute object-contain w-full h-full poster shadow-lg"/>
                    <img
                        src="/jazzahead/ja25-poster.jpg"
                        class="absolute object-contain w-full h-full poster shadow-lg "
                        alt="Jazzahead 2026 Poster"
                    />
                    <img
                        src="/jazzahead/ja_poster2026.jpg"
                        class="absolute object-contain w-full h-full poster shadow-lg "
                        alt="Jazzahead 2026 Poster"
                    />
                </div>
            </div>
        <div ref="text" class="text text-base max-w-72 font-family-averRegular">
           <div>
            <p>jazzahead! ist seit 20 Jahren als Fachmesse und Festival international bekannt.  Die Besucher kommen aus 64 Ländern – schwerpunktmäßig aus dem europäischen Ausland.</p> 

            <p><span class="font-family-averBold">Wir begleiten das Festival und die Fachmesse jazzahead! seit 2026</span> mit jählich neuem Erscheinungsbild und einem gestalterischen <span class="font-family-averBold">Rundum-Paket für sämtliche Maßnahmen der Kampagne.</span> </p>

            <div  class="relative z-10">
                <div ref="line" class="border-l ">

                </div>
                <img ref="posterClubnight" src="/jazzahead/ja_posterClubnight.jpg" alt="Jazzahead Poster Clubnight" class="absolute -mt-20 -ml-20 w-full h-auto max-w-40 ">
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
const arrow = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);
const posterContainer = ref<HTMLElement | null>(null);
const year = ref<HTMLElement | null>(null);
 const line = ref<HTMLElement | null>(null);
const posterClubnight = ref<HTMLElement | null>(null);
const line2 = ref<HTMLElement | null>(null);
const textClp = ref<HTMLElement | null>(null);
/*const smallposter1 = ref<HTMLElement | null>(null);
const smallposter2 = ref<HTMLElement | null>(null);
const smallposter3 = ref<HTMLElement | null>(null);

const smallposterWrap = ref<HTMLElement | null>(null); */

let ctx: gsap.Context | null = null;

onMounted(() => {
  ctx = gsap.context(() => {
    const section = panelJazz.value;
    const bg = background.value;
    const arr = arrow.value;
    const fg = content.value;
    const yr = year.value;
    const fgContainer = posterContainer.value;
    const posters = gsap.utils.toArray('.poster') as HTMLElement[] | undefined;
    const ln = line.value;
    const pCn = posterClubnight.value;
    const txt = textClp.value;
   /*   const ln2 = line2.value;
    const sp1 = smallposter1.value;     
    const sp2 = smallposter2.value;
    const sp3 = smallposter3.value; 
    const spWrap = smallposterWrap.value;
    */

    if (!section || !bg || !fg || !posters) return;

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
    // bg, arr, fg, and fgContainer use fromTo for reliable control
    tl.set(fg, { autoAlpha: 0, scale: 0.6, y: 40 });
    tl.set(fgContainer, { autoAlpha: 0 });
    tl.set(posters, { autoAlpha: 1, y: 0 });
    tl.set(txt, { autoAlpha: 0 });
  
    tl.set(ln, { height: 0 });
    tl.set(pCn, { autoAlpha: 0, y: 0 });
    // ensure wrapper starts off-screen (matches Tailwind) and posters hidden
    /*if (spWrap) tl.set(spWrap, { xPercent: -100 });
    tl.set([sp1, sp2, sp3], { autoAlpha: 0, y: 12 });
    tl.set(ln2, { height: 0 });
         */

        // Explicit durations so the scrubbed timeline maps clearly to scroll
        const delay = 0.05; // general delay between steps (relative timeline units)
        const fadeDur = 0.3; // bg fade duration (relative timeline units)
        const fgDur = 0.4;
       // foreground fade duration

        // 1) bg fades in and slides
        tl.fromTo(bg, 
            { autoAlpha: 0, xPercent: 0 },
            { autoAlpha: 1, xPercent: -100, ease: 'none', duration: fadeDur }, 
            0
        );
        tl.fromTo(fg,
            { autoAlpha: 0, y: 40, scale: 0.6 },
            { autoAlpha: 1, y: -80, scale: 1, ease: 'back.out(0.8)', duration: 0.2 },
            fadeDur
        );
        tl.fromTo(arr, 
            { autoAlpha: 0, xPercent: -100 },
            { autoAlpha: 1, xPercent: 100, ease: 'power2.inOut', duration: fadeDur }, 
            0.3
        );
        tl.fromTo(fgContainer, 
            { autoAlpha: 0 },
            { autoAlpha: 1, ease: 'none', duration: fadeDur }, 
            0.6
        );
        // 2) bg slides left after fade completes
 
            // 3) foreground "bounce in" after slide completes
            // Use a fromTo so we get a bouncy entrance while preserving final y offset

           // 4) big posters: sequential fade-in / fade-out and update year

        
                // DOM order is 22,23,24,25,26 (26 is top). Reverse so we animate top->bottom.
                const rev = posters.slice().reverse();
                // make sure all posters are visible and stacked before we start fading the top ones
         
                const posterYears = ['2026','2025','2024','2023','2022'];
                // start the poster/year sequence later in the timeline
                const posterSeqStart = 0.8;
                // fade out the top poster first (26), then update the year to the next value beneath it
                // ensure initial year shown
                if (yr) yr.textContent = posterYears[0];
                // create a small sub-timeline for posters so ordering is preserved relative to posterSeqStart
                const postersTL = gsap.timeline();
                rev.forEach((p, i) => {
                    if (i < rev.length - 1) {
                        const stepLabel = `step${i}`;
                        postersTL.addLabel(stepLabel);
                        
                        // fade out the top poster over 0.6s (reveals the one beneath)
                        postersTL.to(p, { autoAlpha: 0, ease: 'power2.inOut', duration: 0.6 }, stepLabel);
                    }
                });
                // drive the year text from the postersTL progress so scrubbing both ways stays in sync
                const steps = posterYears.length - 1;
                const yearProxy = { v: 0 };
                postersTL.to(yearProxy, {
                    v: steps,
                    duration: postersTL.duration(),
                    ease: 'none',
                    onUpdate: () => {
                        const idx = Math.min(steps, Math.max(0, Math.round(yearProxy.v)));
                        if (yr) yr.textContent = posterYears[idx];
                    }
                }, 0);
                // add the posters sub-timeline into the main tl at the desired start
                tl.add(postersTL, posterSeqStart);

        // 5) text fades in
        tl.fromTo(txt, 
            { autoAlpha: 0 },
            { autoAlpha: 1, ease: 'none', duration: fgDur }, 
            0.4
        );
        // Split text animation
       
         tl.from(split.words, {
            y: 100,
            autoAlpha: 0,
            stagger: {
                amount: 0.1,
                from: "start"
            },
            ease: "power2.out",
            duration: 0.08,
            }, 0.5);

        // 6) line grows
        tl.to(ln, { height: 128, ease: 'none', duration: 0.1 }, 0.7);
        // 7) posterClubnight pops in
        tl.fromTo(pCn, 
            { autoAlpha: 0, y: 0 },
            { autoAlpha: 1, y: 0, duration: 0.1 }, 
            0.8
        );
        // 7) line2 grows
        /*  tl.to(ln2, { height: 40, ease: 'none', duration: 0.1 }, fadeDur * 5);
        // 7) textClp fades in
        tl.to(txt, { opacity: 1,
            ease: 'none', duration: 0.1 
            }, fadeDur * 4);
        
                // 8) bring wrapper in, then fade/raise posters sequentially
                if (spWrap) {
                    tl.to(spWrap, { xPercent: 0, ease: 'power2.out', duration: 0.35 }, fadeDur * 4);
                }
                // Sequence: show small posters (visual accents) — do not change the main year here
                tl.fromTo(sp1, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, ease: 'power3.out', duration: 0.35 }, fadeDur * 4 + 0.05)
                    .fromTo(sp2, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, ease: 'power3.out', duration: 0.35 }, '+=0.06')
                    .fromTo(sp3, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, ease: 'power3.out', duration: 0.35 }, '+=0.06'); */

    }, panelJazz.value);
});

onUnmounted(() => {
  ctx?.revert();
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<style scoped>
/* Initial states now managed by GSAP for reliability */
</style>

