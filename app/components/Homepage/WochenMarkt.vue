<template>
    <section
    ref="panelWochenMarkt"
    class="relative min-h-screen overflow-hidden bg-white"
    >
    <!-- Background image panel -->
    <div
        ref="background"
    >
        <img
        src="/wm/background.png"
        class="w-full h-full object-cover object-right"
        alt=""
        />
    </div>

    <!-- Foreground / overlay panel -->
    <div
      
        class="absolute top-0 translate-y-2/6 left-0 z-10"
    >
        <div class="grid grid-cols-4 gap-5 ">
                 <div ref="text" class="text text-base max-w-84 font-family-averRegular bg-white ml-auto p-5 size-min">
                    <p>Die Wochenmärkten in Bremen und Bremerhaven bieten eigenständige Betriebe aus der Region frische, saisonale Produkte von höchster Qualität zum Verkauf an. </p>

                    <p>Mittels eines von uns <span class="font-family-averBold">vollumfänglich erneuerten Corporate Designs</span>, begleiten wir die Wochenmärkte Bremen und Bremerhaven <span class="font-family-averBold">medienübergreifend mit Kampagnen und Kommunikationsmedien.</span></p>
              
            </div>
            <div class="col-span-2 grid grid-cols-2  justify-between border-2 p-5 border-white text-white gap-20 z-20 relative">
                    <div >
                        <h2 class="text-5xl font-family-averBold text-white">MEINE WOCHENMÄRKTE BREMEN BREMERHAVEN</h2>
                        <div class="bg-red-300">
                            content
                        </div>
                    </div>
                    <div class="flex flex-col items-end">
                       
                        <div class="border-b w-40">
                             <div >Anzeigen</div>

                        </div>
                        <div class="bg-yellow-200 w-full">
                            content 
                        </div>
                    </div>
              
            </div>
             <div ref="text" class="text text-base font-family-averRegular relative z-0">
                <div class="absolute bg-purple-300 w-72 -left-20 ">
                    content
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

const panelWochenMarkt = ref<HTMLElement | null>(null);
let ctx: gsap.Context | null = null;

onMounted(() => {
    ctx = gsap.context(() => {
    const section = panelWochenMarkt.value;

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

