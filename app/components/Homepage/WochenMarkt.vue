<template>
    <section
    ref="panelWochenMarkt"
    class="relative min-h-screen overflow-hidden bg-white"
    >
    <!-- Background image panel -->
    <div
        ref="background"
        class="border-2 border-white"
    >
        <img
        src="/wm/background.png"
        class="w-full h-full object-cover object-right border-2 bg-white"
        alt=""
        />
    </div>

    <div ref="orange" class="absolute top-0 left-0 w-full h-full  z-10 ">
       <img
        src="/wm/orange.png"
        class="w-full h-full object-center"
        alt=""
        />
     
 
    </div> 
   

    <!-- Foreground / overlay panel -->
    <div
      
        class="absolute top-0 translate-y-2/6 left-0 z-0"
    >
        <div class="grid grid-cols-4 gap-5 ">
                 <div ref="leftText" class="text-base max-w-84 font-family-averRegular bg-white ml-auto p-5 size-min">
                    <p>Die Wochenmärkten in Bremen und Bremerhaven bieten eigenständige Betriebe aus der Region frische, saisonale Produkte von höchster Qualität zum Verkauf an. </p>

                    <p>Mittels eines von uns <span class="font-family-averBold">vollumfänglich erneuerten Corporate Designs</span>, begleiten wir die Wochenmärkte Bremen und Bremerhaven <span class="font-family-averBold">medienübergreifend mit Kampagnen und Kommunikationsmedien.</span></p>
              
            </div>
            <div class="col-span-2 grid grid-cols-2  justify-between border-2 p-5 border-white text-white gap-20  relative">
                    <div >
                        <h2 class="text-5xl font-family-averBold text-white split">MEINE WOCHENMÄRKTE BREMEN BREMERHAVEN</h2>
                        <div class="hidden bg-red-300">
                            content
                        </div>
                    </div>
                    <div class="flex flex-col items-end">
                       
                        <div class="border-b w-40">
                             <div >Anzeigen</div>

                        </div>
                        <div class="hidden bg-yellow-200 w-full">
                            content 
                        </div>
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

let ctx: gsap.Context | null = null;

onMounted(() => {
    ctx = gsap.context(() => {
    const section = panelWochenMarkt.value;

    if (!section ) return;

        // Pin the section for 4 viewport heights
        const pinDuration = window.innerHeight * 2;
        const split = new SplitText(".split", { type: "words" });
        const orangeEl = orange.value;
        const textEl = leftText.value;
        
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
                start: 'top bottom+=200', // start earlier - when section is still 500px below viewport
                end: () => `+=${pinDuration + window.innerHeight + 500}`, // include pre-pin distance + offset
                scrub: true,
            }
        });

        // Animate the orange SVG circle
        tl.set(orangeEl, { yPercent: -100 });
        tl.set(textEl, { autoAlpha: 0 });


        tl.fromTo(orangeEl, { yPercent: -100 },  {
            yPercent: 0,
            ease: 'elastic.inOut',
            duration: 0.5,
        }, 0);

        // Animate the orange SVG circle radius - short duration for quick animation feel
        const radiusObj = { value: 0 };
        tl.to(radiusObj, {
            value: 3800,
            ease: 'power2.out',
            duration: 0.25, // short duration in timeline = animates quickly during scroll
            onUpdate: () => {
                orangeSVG.value?.updateRadius(radiusObj.value);
            }
        }, 0.5);

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

        tl.to(textEl, { autoAlpha: 1, duration: 0.5 }, 0.6);

        

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
.smallposter{ will-change: transform, opacity; opacity: 0; transform: translateY(12px); }
</style>

