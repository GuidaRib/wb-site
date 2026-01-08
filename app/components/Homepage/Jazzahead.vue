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

   
    <div ref="arrowblur"class="z-20 absolute backdrop-blur-sm   top-1/2 -translate-y-1/2  h-3/5 w-full"
      style="mask-image: url('/jazzahead/ja_arrowbackground.svg'); 
                   mask-size: contain; 
                   mask-repeat: no-repeat; 
                   mask-position: center;
                   -webkit-mask-image: url('/jazzahead/ja_arrowbackground.svg');
                   -webkit-mask-size: contain;
                   -webkit-mask-repeat: no-repeat;
                   -webkit-mask-position: center;"
                   ></div>
    <!-- Arrow / overlay panel -->
    <div
        ref="arrow"
        class="absolute z-20 top-1/2 -translate-y-1/2  h-3/5 w-full"
        >
        <!-- Backdrop blur div masked by SVG shape -->
        
    

        <!-- Arrow image on top -->
        <img
            src="/jazzahead/ja_arrow.png"
            alt="arrow"
            class="relative w-full h-full object-contain pointer-events-none"
        />
        </div>


    <!-- Foreground / overlay panel -->
    <div
      
        class="absolute z-10 translate-y-2/6  w-full "
    >
        <div class="grid grid-cols-4 gap-5">
            <div class="">
                
            </div>
            <div ref="content" class="col-span-2 grid grid-cols-2 bg-white justify-between border-2 p-5 z-20">
                <div  class="flex justify-between flex-col ">
                    <span ref="year" class="w-34 break-all text-8xl font-family-averBlack">2026</span> 
                    <div class="relative ">
                        <span ref="textClp" class="text-base font-family-averRegular">CLP</span>
                        <div ref="line2" class="border-l mb-8"></div>
                        <div ref="smallposterWrap" class=" h-38 overflow-visible flex flex-row-reverse gap-10">
                            <img ref="smallposter1" class="absolute object-contain h-38 w-auto z-80" src="/jazzahead/ja_clp.png" alt="" >
                            <img ref="smallposter2" class="absolute object-contain h-38 w-auto z-80" src="/jazzahead/ja_clp_big.png"  alt="" >
                            <img ref="smallposter3" class="absolute object-contain h-38 w-auto z-80"  src="/jazzahead/ja_beer.png" alt="" >
                            <img ref="smallposter4" class="absolute object-contain h-38 w-auto z-80"  src="/jazzahead/ja_programheft.png" alt="" >
                        </div> 
                    </div>
                 
                </div>
                <div ref="posterContainer" class="relative col-span-1 w-full h-[70vh] z-50">
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

            <div class="relative z-40">
                <div ref="line" class="border-l z-">

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
const arrowblur = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);
const posterContainer = ref<HTMLElement | null>(null);
const year = ref<HTMLElement | null>(null);
 const line = ref<HTMLElement | null>(null);
const posterClubnight = ref<HTMLElement | null>(null);
const line2 = ref<HTMLElement | null>(null);
const textClp = ref<HTMLElement | null>(null);
const smallposter1 = ref<HTMLElement | null>(null);
const smallposter2 = ref<HTMLElement | null>(null);
const smallposter3 = ref<HTMLElement | null>(null);
const smallposter4 = ref<HTMLElement | null>(null);
const smallposterWrap = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;

onMounted(() => {
  ctx = gsap.context(() => {
    const section = panelJazz.value;
    const bg = background.value;
    const arr = arrow.value;
    const arrBlur = arrowblur.value;
    const fg = content.value;
    const yr = year.value;
    const fgContainer = posterContainer.value;
    const posters = gsap.utils.toArray('.poster') as HTMLElement[] | undefined;
    const ln = line.value;
    const pCn = posterClubnight.value;
    const txt = textClp.value;
    const ln2 = line2.value;
    const sp1 = smallposter1.value;     
    const sp2 = smallposter2.value;
    const sp3 = smallposter3.value;
    const sp4 = smallposter4.value;
    const spWrap = smallposterWrap.value;
    

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
    tl.set(ln2, { height: 0 });
    // Position all small posters off-screen to the left
    if (sp1) tl.set(sp1, { left: '-200%' });
    if (sp2) tl.set(sp2, { left: '-200%' });
    if (sp3) tl.set(sp3, { left: '-200%' });
    if (sp4) tl.set(sp4, { autoAlpha: 0, left: '-200%' });


        // Explicit durations so the scrubbed timeline maps clearly to scroll
        const delay = 0.05; // general delay between steps (relative timeline units)
        const fadeDur = 0.5; // bg fade duration (relative timeline units)
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
            0.4
        );
        tl.fromTo(arr, 
            { autoAlpha: 0, left: '-60%' },
            { autoAlpha: 1, left: '0%', ease: 'power2.inOut', duration: fadeDur }, 
            0.1
        ); 
         tl.fromTo(arrBlur, 
            {  left: '-60%' },
            { autoAlpha: 1, left: '0%', ease: 'power2.inOut', duration: fadeDur }, 
            0.1
        ); 
        tl.fromTo(fgContainer, 
            { autoAlpha: 0 },
            { autoAlpha: 1, ease: 'none', duration: fadeDur }, 
            0.5
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

                // 5) text fades in
        tl.fromTo(txt, 
            { autoAlpha: 0 },
            { autoAlpha: 1, ease: 'none', duration: fgDur }, 
            0.9
        );
        // 7) line2 grows
        tl.to(ln2, { height: 40, ease: 'none', duration: 0.1 }, 0.9);
        
        // 8) Animate each poster individually to its calculated position
        if (sp1 && sp2 && sp3 && sp4 && txt) {
            const gap = 40; // gap between images (gap-10 = 40px)
            const targetLeft = 0; // left-5 = 20px
            
            // Get image widths
            const w1 = sp1.offsetWidth || 96;
            const w2 = sp2.offsetWidth || 96;
            const w3 = sp3.offsetWidth || 96;
            const w4 = sp4.offsetWidth || 96;
            
            // First stop positions
            const pos1 = targetLeft;
            const pos2 = targetLeft - (w1 + gap);
            const pos3 = targetLeft - 2 * (w1 + gap);
            const pos4 = targetLeft - 3 * (w1 + gap);
            
            const startTime = 1.0;
            const moveDur = 0.15;
            const staggerDelay = 0.08;
            
            // Initial text
            txt.textContent = 'CLP';
            
            // Phase 1: Animate to first stop
            tl.fromTo(sp1,
                { left: '-200%' },
                { left: pos1, ease: 'power2.out', duration: moveDur },
                startTime
            );
            
            tl.fromTo(sp2, 
                { left: '-200%' },
                { left: pos2, ease: 'power2.out', duration: moveDur },
                startTime + staggerDelay
            ); 
            
            tl.fromTo(sp3, 
                { autoAlpha: 0, left: '-200%' },
                { autoAlpha: 1, left: pos3, ease: 'power2.out', duration: moveDur },
                startTime + staggerDelay * 2
            );
            
            tl.fromTo(sp4, 
                { autoAlpha: 0, left: '-200%' },
                { autoAlpha: 1, left: pos4, ease: 'power2.out', duration: moveDur },
                startTime + staggerDelay * 3
            );
            
            // Phase 2: Continue moving and change text
            const continueTime = startTime + staggerDelay * 3 + moveDur + 0.15;
            const continueDur = 0.2;
            const textChangeDelay = 0.1;
            
            // Text labels for each phase
            const textLabels = ['CLP', 'GROSSEFLASCHE', 'MERCHANDISE', 'PROGRAMHEFT'];
            
            // Create a proxy object to track timeline progress for text changes
            const textProgress = { value: 0 };
            
            // Move all posters together to the right, each reaching targetLeft position in sequence
            // As sp2 reaches targetLeft, change text to GROSSEFLASCHE
            tl.fromTo(sp1, { left: pos1 }, { left: targetLeft + w2 + gap, ease: 'power1.inOut', duration: continueDur }, continueTime);
            tl.fromTo(sp2, { left: pos2 }, { left: targetLeft, ease: 'power1.inOut', duration: continueDur }, continueTime);
            tl.fromTo(sp3, { left: pos3 }, { left: targetLeft - (w2 + gap), ease: 'power1.inOut', duration: continueDur }, continueTime);
            tl.fromTo(sp4, { left: pos4 }, { left: targetLeft - 2 * (w2 + gap), ease: 'power1.inOut', duration: continueDur }, continueTime);
            
            // Continue moving, sp3 reaches targetLeft, change text to MERCHANDISE
            const time2 = continueTime + continueDur + textChangeDelay;
            const pos1_step2 = targetLeft + w2 + gap;
            const pos2_step2 = targetLeft;
            const pos3_step2 = targetLeft - (w2 + gap);
            const pos4_step2 = targetLeft - 2 * (w2 + gap);
            
            tl.fromTo(sp1, { left: pos1_step2 }, { left: targetLeft + w2 + gap + w3 + gap, ease: 'power1.inOut', duration: continueDur }, time2);
            tl.fromTo(sp2, { left: pos2_step2 }, { left: targetLeft + w3 + gap, ease: 'power1.inOut', duration: continueDur }, time2);
            tl.fromTo(sp3, { left: pos3_step2 }, { left: targetLeft, ease: 'power1.inOut', duration: continueDur }, time2);
            tl.fromTo(sp4, { left: pos4_step2 }, { left: targetLeft - (w3 + gap), ease: 'power1.inOut', duration: continueDur }, time2);
            
            // Continue moving, sp4 reaches targetLeft, change text to PROGRAMHEFT
            const time3 = time2 + continueDur + textChangeDelay;
            const pos1_step3 = targetLeft + w2 + gap + w3 + gap;
            const pos2_step3 = targetLeft + w3 + gap;
            const pos3_step3 = targetLeft;
            const pos4_step3 = targetLeft - (w3 + gap);
            
            tl.fromTo(sp1, { left: pos1_step3 }, { left: targetLeft + w2 + gap + w3 + gap + w4 + gap, ease: 'power1.inOut', duration: continueDur }, time3);
            tl.fromTo(sp2, { left: pos2_step3 }, { left: targetLeft + w3 + gap + w4 + gap, ease: 'power1.inOut', duration: continueDur }, time3);
            tl.fromTo(sp3, { left: pos3_step3 }, { left: targetLeft + w4 + gap, ease: 'power1.inOut', duration: continueDur }, time3);
            tl.fromTo(sp4, { left: pos4_step3 }, { left: targetLeft, ease: 'power1.inOut', duration: continueDur }, time3);
            
            // Phase 3: Move all images off-screen to the right and clear text
            const time4 = time3 + continueDur + 0.15;
            const exitDur = 0.3;
            const finalPos1 = targetLeft + w2 + gap + w3 + gap + w4 + gap;
            const finalPos2 = targetLeft + w3 + gap + w4 + gap;
            const finalPos3 = targetLeft + w4 + gap;
            const finalPos4 = targetLeft;
            
            const moveDistance = 2000; // pixels to move right, keeping relative spacing
            
            tl.fromTo(sp1, { left: finalPos1 }, { left: finalPos1 + moveDistance, ease: 'power2.in', duration: exitDur }, time4);
            tl.fromTo(sp2, { left: finalPos2 }, { left: finalPos2 + moveDistance, ease: 'power2.in', duration: exitDur }, time4);
            tl.fromTo(sp3, { left: finalPos3 }, { left: finalPos3 + moveDistance, ease: 'power2.in', duration: exitDur }, time4);
            tl.fromTo(sp4, { left: finalPos4 }, { left: finalPos4 + moveDistance, ease: 'power2.in', duration: exitDur }, time4);
            
            // Hide line2 when text disappears
            if (ln2) {
                tl.fromTo(ln2, { height: 40 }, { height: 0, ease: 'power2.in', duration: exitDur * 0.5 }, time4);
            }
            
             // 7) posterClubnight pops in
            tl.fromTo(pCn, 
                { autoAlpha: 1},
                { autoAlpha: 0, duration: 0.1 }, 
                2
            );


            // Add text tracking that works in both directions (scroll up and down)
            const totalTextDuration = time3 + continueDur - continueTime;
            tl.fromTo(textProgress, 
                { value: 0 },
                { 
                    value: 4,
                    duration: time4 + exitDur - continueTime,
                    ease: 'none',
                    onUpdate: () => {
                        const idx = Math.min(4, Math.max(0, Math.round(textProgress.value)));
                        if (txt) {
                            if (idx === 4) {
                                txt.textContent = '';
                            } else {
                                txt.textContent = textLabels[idx];
                            }
                        }
                    }
                },
                continueTime
            );
        }
        

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

