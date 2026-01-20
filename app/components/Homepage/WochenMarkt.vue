<template>
    <section
    ref="panelWochenMarkt"
    class="relative min-h-screen overflow-hidden bg-white"
    >
    <!-- Background image panel -->
    <div
        ref="background"
        class="border-2 border-white w-full h-screen "
    >
        <div class="mx-auto h-[60vh]  md:w-2/4 top-40 overflow-hidden  border-2 border-white relative">
            <div class="">
            <img
                src="/wm/background.png"
                class="h-screen w-auto object-cover -mt-40"
                alt=""
            />
            </div>
        </div>
      

    </div>

    <div ref="orange" class="absolute top-0 left-0 w-full h-full  z-10 ">
       <img
        src="/wm/orange.png"
        class="w-full h-full object-center object-contain"
        alt=""
        />
     
 
    </div> 
   

    <!-- Foreground / overlay panel -->
    <div
      
        class="absolute top-0 translate-y-2/6 left-0 z-20"
    >
        <div class="grid grid-cols-4 gap-5 ">
                 <div ref="leftText" class="text text-base max-w-84 font-family-averRegular  ml-auto p-5 size-min">
                    <p>Die Wochenmärkten in Bremen und Bremerhaven bieten eigenständige Betriebe aus der Region frische, saisonale Produkte von höchster Qualität zum Verkauf an. </p>

                    <p>Mittels eines von uns <span class="font-family-averBold">vollumfänglich erneuerten Corporate Designs</span>, begleiten wir die Wochenmärkte Bremen und Bremerhaven <span class="font-family-averBold">medienübergreifend mit Kampagnen und Kommunikationsmedien.</span></p>
              
            </div>
            <div class="col-span-2 grid grid-cols-2  justify-between p-5  text-white gap-20  relative">
                    <div >
                        <h2 class="text-5xl font-family-averBold text-white split">MEINE WOCHENMÄRKTE BREMEN BREMERHAVEN</h2>
                        <div class="hidden ">
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
        const splitTitle = new SplitText(".split", { type: "words" });
        const splitContent= new SplitText(".text", { type: "words" });
        const orangeEl = orange.value;

        
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

         tl.from(splitTitle.words, {
            autoAlpha: 0,
            stagger: {
                amount: 0.1,
                from: "start"
            },
            ease: "power2.out",
            duration: 0.08,
            }, 0.6);

        tl.from(splitContent.words, {
            autoAlpha: 0,
            stagger: {
                amount: 0.1,
                from: "start"
            },
            ease: "power2.out",
            duration: 0.08,
            }, 0.8);
    
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

