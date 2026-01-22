<template>
    <section
    ref="panelWochenMarkt"
    class="relative min-h-screen w-full overflow-hidden "
    >
    <!-- Background image panel -->
    <div
        ref="background"

     >
       <img
        src="/wm/background.png"
        class="w-full h-full object-cover "
        alt=""
        />
    </div>

    <div ref="orange" class="absolute top-0 left-0 w-full h-full  z-10 ">
    <img
     src="/wm/orange.png"
     class="w-full h-full object-contain object-center"
     alt=""
     />
     
 
    </div> 
   

    <!-- Foreground / overlay panel -->
    <div
      
        class="absolute top-1/2 -translate-y-3/4 left-0 "
    >
        <div class="grid grid-cols-4 gap-5 ">
                 <div ref="leftText" class="text-base max-w-84 font-family-averRegular bg-white ml-auto p-5 h-min">
                    <p>Die Wochenmärkten in Bremen und Bremerhaven bieten eigenständige Betriebe aus der Region frische, saisonale Produkte von höchster Qualität zum Verkauf an. </p>

                    <p>Mittels eines von uns <span class="font-family-averBold">vollumfänglich erneuerten Corporate Designs</span>, begleiten wir die Wochenmärkte Bremen und Bremerhaven <span class="font-family-averBold">medienübergreifend mit Kampagnen und Kommunikationsmedien.</span></p>
              
            </div>
            <div class="col-span-2 grid grid-cols-2 justify-between border-2 p-5 border-white text-white gap-20 relative min-h-[75vh]">
                    <div >
                        <h2 class="text-5xl font-family-averBold text-white split">MEINE WOCHENMÄRKTE BREMEN BREMERHAVEN</h2>
          
                    </div>
                    <div class="flex flex-col items-end relative">
                       
                        <div class="relative pr-4">
                            <span ref="textClp" class="text-base font-family-averRegular">Aktion</span>
                             <div ref="line2" class="border-t w-60"></div>
                             <div ref="smallposterWrap" class="flex gap-10 w-60 flex-col-reverse overflow-visible absolute -right-60">
                                <img ref="smallposter1" class="absolute smallposter w-60 object-contain h-auto" src="/wm/wm_gluecksrad_2023.png" alt="">
                                <img ref="smallposter2" class="absolute smallposter w-60 object-contain h-auto" src="/wm/wm-az_2023.png" alt="">
                                <img ref="smallposter3" class="absolute smallposter w-60 object-contain h-auto" src="/wm/wm_e-auto_2024.png" alt="">
                                <img ref="smallposter4" class="absolute smallposter w-60 object-contain h-auto" src="/wm/wm_flaggen_2024.png" alt="">
                            </div>

                        </div>
                  

                                <img ref="computerImage" src="/wm/wm_computer.png" alt="" class="absolute w-[30vw] max-w-screen h-auto bottom-0 right-0 object-contain ">
            
                   
                    </div>
              
            </div>
             <div ref="text" class="hidden text text-base font-family-averRegular relative z-0">
                <div class="absolute bg-purple-300 w-72 -left-20 ">
                    content
                </div>
          
            </div>
        </div>
    </div>



   <SVGOrange ref="orangeSVG" class="bg-purple-da absolute top-0 left-0 w-full h-full z-0"/>

    </section>

</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ref, onMounted, onUnmounted } from "vue";
import SVGOrange from "../SVG/Orange.vue";

gsap.registerPlugin(ScrollTrigger, SplitText);

const panelWochenMarkt = ref<HTMLElement | null>(null);
const orangeSVG = ref<InstanceType<typeof SVGOrange> | null>(null);
const orange = ref<HTMLElement | null>(null);
const leftText = ref<HTMLElement | null>(null);
const line2 = ref<HTMLElement | null>(null);
const textClp = ref<HTMLElement | null>(null);
const smallposter1 = ref<HTMLElement | null>(null);
const smallposter2 = ref<HTMLElement | null>(null);
const smallposter3 = ref<HTMLElement | null>(null);
const smallposter4 = ref<HTMLElement | null>(null);
const smallposterWrap = ref<HTMLElement | null>(null);
const computerImage = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;

onMounted(() => {
    ctx = gsap.context(() => {
    const section = panelWochenMarkt.value;

    if (!section ) return;

        // Pin the section for 4 viewport heights
        const pinDuration = window.innerHeight * 4;
        const split = new SplitText(".split", { type: "words" });
        const orangeEl = orange.value;
        const textEl = leftText.value;
        const txt = textClp.value;
        const ln2 = line2.value;
        const sp1 = smallposter1.value;     
        const sp2 = smallposter2.value;
        const sp3 = smallposter3.value;
        const sp4 = smallposter4.value;
        const cpImg = computerImage.value;

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
                start: 'top center', // start earlier - when section is still 500px below viewport
                end: () => `+=${pinDuration }`, // include pre-pin distance + offset
                scrub: true,
            }
        });

        // Animate the orange SVG circle
        tl.set(orangeEl, { yPercent: -100 });
        tl.set(textEl, { autoAlpha: 0 });

        tl.set(ln2, { height: 0 });
        // Position all small posters off-screen to the left
        if (sp1) tl.set(sp1, { top: '-380px' });
        if (sp2) tl.set(sp2, { top: '-380px' });
        if (sp3) tl.set(sp3, { top: '-380px' });
        if (sp4) tl.set(sp4, {  top: '-380px' });
        tl.set(cpImg, {  xPercent: 200 });

        tl.fromTo(orangeEl, { yPercent: -100 },  {
            yPercent: 0,
            ease: 'elastic.inOut',
            duration: 0.6,
        }, 0);

        // Animate the orange SVG circle radius - short duration for quick animation feel
        const radiusObj = { value: 0 };
        tl.to(radiusObj, {
            value: 3800,
            ease: 'power2.out',
            duration: 1.0, // short duration in timeline = animates quickly during scroll
            onUpdate: () => {
                orangeSVG.value?.updateRadius(radiusObj.value);
            }
        }, 0.6);
        tl.to(orangeEl, {
           opacity: 0,
            ease: 'power2.in',
            duration: 0.2,
        }, 0.6);

         tl.from(split.words, {
            y: 100,
            autoAlpha: 0,
            stagger: {
                amount: 0.1,
                from: "start"
            },
            ease: "power2.out",
            duration: 0.08,
            }, 0.7);

        tl.to(textEl, { autoAlpha: 1, duration: 0.6 }, 0.8);

          if (sp1 && sp2 && sp3 && sp4 && txt) {
            const gap = 40; // gap between images (gap-10 = 40px)
            const targetTop = 0; // top-5 = 20px
            
            // Get image widths
            const w1 = sp1.offsetHeight || 180;
            const w2 = sp2.offsetHeight|| 180;
            const w3 = sp3.offsetHeight|| 180;
            const w4 = sp4.offsetHeight || 180;
            
            // First stop positions
            const pos1 = targetTop;
            const pos2 = targetTop - (w1 + gap);
            const pos3 = targetTop - 2 * (w1 + gap);
            const pos4 = targetTop - 3 * (w1 + gap);
            
            const startTime = 1.0;
            const moveDur = 0.15;
            const staggerDelay = 0.08;
            
            // Initial text
            txt.textContent = 'CLP';
            
             // Phase 1: Animate to first stop
            tl.fromTo(sp1,
                { autoAlpha: 0, top: '-380px' },
                { autoAlpha: 1, top: pos1, ease: 'power2.out', duration: moveDur },
                startTime
            );
            
            tl.fromTo(sp2, 
                { autoAlpha: 0, top: '-380px' },
                { autoAlpha: 1, top: pos2, ease: 'power2.out', duration: moveDur },
                startTime + staggerDelay
            ); 
            
            tl.fromTo(sp3,
                { autoAlpha: 0, top: '-380px' },
                { autoAlpha: 1, top: pos3, ease: 'power2.out', duration: moveDur },
                startTime + staggerDelay * 2
            );
            
            tl.fromTo(sp4, 
                { autoAlpha: 0, top: '-380px' },
                { autoAlpha: 1, top: pos4, ease: 'power2.out', duration: moveDur },
                startTime + staggerDelay * 3
            ); 
            
            // Phase 2: Continue moving and change text
            const continueTime = startTime + staggerDelay * 3 + moveDur + 0.15;
            const continueDur = 0.2;
            const textChangeDelay = 0.1;
            
            // Text labels for each phase
            const textLabels = ['AKTIONEN', 'ANZEIGEN ', 'FAHRZEUGBEKLEBUNG', 'WERBEMITTEL'];
            
            // Create a proxy object to track timeline progress for text changes
            const textProgress = { value: 0 };
            
            // Move all posters together to the right, each reaching targetTop position in sequence
            // As sp2 reaches targetTop, change text to GROSSEFLASCHE
            tl.fromTo(sp1, { top: pos1 }, { top: targetTop + w2 + gap, ease: 'power1.inOut', duration: continueDur }, continueTime);
            tl.fromTo(sp2, { top: pos2 }, { top: targetTop, ease: 'power1.inOut', duration: continueDur }, continueTime);
            tl.fromTo(sp3, { top: pos3 }, { top: targetTop - (w2 + gap), ease: 'power1.inOut', duration: continueDur }, continueTime);
            tl.fromTo(sp4, { top: pos4 }, { top: targetTop - 2 * (w2 + gap), ease: 'power1.inOut', duration: continueDur }, continueTime);
            
            // Continue moving, sp3 reaches targetTop, change text to MERCHANDISE
            const time2 = continueTime + continueDur + textChangeDelay;
            const pos1_step2 = targetTop + w2 + gap;
            const pos2_step2 = targetTop;
            const pos3_step2 = targetTop - (w2 + gap);
            const pos4_step2 = targetTop - 2 * (w2 + gap);
            
            tl.fromTo(sp1, { top: pos1_step2 }, { top: targetTop + w2 + gap + w3 + gap, ease: 'power1.inOut', duration: continueDur }, time2);
            tl.fromTo(sp2, { top: pos2_step2 }, { top: targetTop + w3 + gap, ease: 'power1.inOut', duration: continueDur }, time2);
            tl.fromTo(sp3, { top: pos3_step2 }, { top: targetTop, ease: 'power1.inOut', duration: continueDur }, time2);
            tl.fromTo(sp4, { top: pos4_step2 }, { top: targetTop - (w3 + gap), ease: 'power1.inOut', duration: continueDur }, time2);
            
            // Continue moving, sp4 reaches targetTop, change text to PROGRAMHEFT
            const time3 = time2 + continueDur + textChangeDelay;
            const pos1_step3 = targetTop + w2 + gap + w3 + gap;
            const pos2_step3 = targetTop + w3 + gap;
            const pos3_step3 = targetTop;
            const pos4_step3 = targetTop - (w3 + gap);
            
            tl.fromTo(sp1, { top: pos1_step3 }, { top: targetTop + w2 + gap + w3 + gap + w4 + gap, ease: 'power1.inOut', duration: continueDur }, time3);
            tl.fromTo(sp2, { top: pos2_step3 }, { top: targetTop + w3 + gap + w4 + gap, ease: 'power1.inOut', duration: continueDur }, time3);
            tl.fromTo(sp3, { top: pos3_step3 }, { top: targetTop + w4 + gap, ease: 'power1.inOut', duration: continueDur }, time3);
            tl.fromTo(sp4, { top: pos4_step3 }, { top: targetTop, ease: 'power1.inOut', duration: continueDur }, time3);
            
            // Phase 3: Move all images off-screen to the right and clear text
            const time4 = time3 + continueDur + 0.15;
            const exitDur = 0.3;
            const finalPos1 = targetTop + w2 + gap + w3 + gap + w4 + gap;
            const finalPos2 = targetTop + w3 + gap + w4 + gap;
            const finalPos3 = targetTop + w4 + gap;
            const finalPos4 = targetTop;
            
            const moveDistance = 2000; // pixels to move right, keeping relative spacing
            
            tl.fromTo(sp1, { top: finalPos1 }, { top: finalPos1 + moveDistance, ease: 'power2.in', duration: exitDur }, time4);
            tl.fromTo(sp2, { top: finalPos2 }, { top: finalPos2 + moveDistance, ease: 'power2.in', duration: exitDur }, time4);
            tl.fromTo(sp3, { top: finalPos3 }, { top: finalPos3 + moveDistance, ease: 'power2.in', duration: exitDur }, time4);
            tl.fromTo(sp4, { top: finalPos4 }, { top: finalPos4 + moveDistance, ease: 'power2.in', duration: exitDur }, time4);
            
            // Hide line2 when text disappears
            if (ln2) {
                tl.fromTo(ln2, { height: 40 }, { height: 0, ease: 'power2.in', duration: exitDur * 0.5 }, time4);
            }
            


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
       
        tl.fromTo(cpImg,
            { xPercent: 200 },
            { xPercent: 0, ease: 'expo.inOut', duration: 0.8 },
            1.5
        );

        tl.fromTo(cpImg,
            { xPercent: 200},
            { xPercent: 0, ease: 'expo.inOut', duration: 0.8 },
            3
        );
    
        

        /* // Initial states
        tl.set(bg, { xPercent: 0, opacity: 0 });
        // set fg to match the from state so there are no jumps
        tl.set(fg, { opacity: 0, scale: 0.6, y: 40 });
        tl.set(ln, { height: 0 });
        tl.set(pCn, { opacity: 0, y: 0 });
        // ensure wrapper starts off-screen (matches Tailwind) and posters hidden
        if (spWrap) tl.set(spWrap, { xPercent: -100 });
        tl.set([sp1, sp2, sp3], { autoAlpha: 0, y: 12 });
        tl.set(txt, { opacity: 0 });
        tl.set(ln2, { height: 0 });
            

            // Explicit durations so the scrubbed timeline maps clearly to scroll
            const fadeDur = 0.08; // bg fade duration (relative timeline units)
            const slideDur = 0.13; // bg slide duration
            const fgDur = 0.05;   // foreground fade duration

            // 1) bg fades in
            tl.to(bg, { opacity: 1, xPercent: -100,ease: 'none', duration: fadeDur }, 0);
            // 2) bg slides left after fade completes
            //tl.to(bg, { , ease: 'none', duration: slideDur }, fadeDur);
                    // 3) foreground "bounce in" after slide completes
                    // Use a fromTo so we get a bouncy entrance while preserving final y offset
                    tl.fromTo(fg,
                        { opacity: 0, y: 40, scale: 0.6 },
                        { opacity: 1, y: -80, scale: 1, ease: 'back.out(0.8)', duration: 0.4 },
                        fadeDur
                    );
            // 4) poster pops in shortly after foreground 
            tl.from('.poster', { opacity: 0, y: 40, duration: 0.1 }, fadeDur );
            // 5) text fades in
            //tl.to(txt, { opacity: 1, ease: 'none', duration: fgDur }, fadeDur * 2);
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
                }, fadeDur * 2);

            // 6) line grows
            tl.to(ln, { height: 128, ease: 'none', duration: 0.1 }, fadeDur * 3);
            // 7) posterClubnight pops in
            tl.from(pCn, { opacity: 0, y: 0, duration: 0.1 }, fadeDur * 4);
            // 7) line2 grows
            tl.to(ln2, { height: 40, ease: 'none', duration: 0.1 }, fadeDur * 4);
            // 7) textClp fades in
            tl.to(txt, { opacity: 1,
                ease: 'none', duration: 0.1 
                }, fadeDur * 4);
            
                    // 8) bring wrapper in, then fade/raise posters sequentially
                    if (spWrap) {
                        tl.to(spWrap, { xPercent: 0, ease: 'power2.out', duration: 0.35 }, fadeDur * 4);
                    }
                    tl.fromTo(sp1, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, ease: 'power3.out', duration: 0.35 }, fadeDur * 4 + 0.05)
                        .fromTo(sp2, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, ease: 'power3.out', duration: 0.35 }, '+=0.01')
                        .fromTo(sp3, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, ease: 'power3.out', duration: 0.35 }, '+=0.01');
    */
  }, panelWochenMarkt.value);
});

onUnmounted(() => {
  ctx?.revert();
  ScrollTrigger.getAll().forEach(t => t.kill());
}); 
</script>

<style scoped>
.smallposter{ will-change: transform, opacity; }
</style>

