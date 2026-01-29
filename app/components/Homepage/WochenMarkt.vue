<template>
    <section
    ref="panelWochenMarkt"
    class="min-h-screen w-full overflow-hidden relative"
    >
        <!-- Background image panel -->
        <div
            ref="mainContent"
            class="grid grid-cols-1 lg:grid-cols-5 2xl:grid-cols-4 w-full h-full "
        >
        <div class="col-span-1 2xl:col-span-1 flex items-center">
                <div ref="mainText" class="mainText text-base font-family-averRegular bg-white p-5 2xl:pl-20 h-min ">
                        <p>Die Wochenmärkten in Bremen und Bremerhaven bieten eigenständige Betriebe aus der Region frische, saisonale Produkte von höchster Qualität zum Verkauf an. </p>

                        <p>Mittels eines von uns <span class="font-family-averBold">vollumfänglich erneuerten Corporate Designs</span>, begleiten wir die Wochenmärkte Bremen und Bremerhaven <span class="font-family-averBold">medienübergreifend mit Kampagnen und Kommunikationsmedien.</span></p>
                </div>

        </div>
        <div class="col-span-3 2xl:col-span-2 flex items-center relative z-0 ">
                <div ref="boxContent" class="bg-[url('/wm/wm_background.png')] bg-cover bg-center bg-no-repeat sm:h-[75vh] w-full  p-4">
                    <div ref="whiteBorder" class="flex flex-col lg:flex-row relative border-white border-2 h-full justify-between z-20">
                        <div class="w-full 2xl:w-1/2 h-full  max-h-56 lg:max-h-none relative z-20">
                            <h2 ref="titleText" class="p-10 titleText text-5xl font-family-averBold text-white split max-w-3xs">MEINE WOCHENMÄRKTE BREMEN BREMERHAVEN</h2>
                            <div class=" text-white gap-2 flex pl-10 w-1/2 lg:w-full">
                                <div ref="mobileElement1" class="w-1/2">
                                    <div class="px-4">
                                        <div ref="textClp" class="text-base font-family-averRegular text-right" >SOCIAL Media</div>
                                        <div class="border-b-2 border-white"></div>
                                    </div>
                                    <img src="/wm/wm_mobile2.png" alt="">
                                </div>
                                <div ref="mobileElement2" class="w-1/2 mt-10 xl:mt-20">
                                    <div class="px-4">
                                        <div ref="textClp" class="text-base font-family-averRegular text-right ">MARKT finder</div>
                                        <div class="border-b-2  border-white"></div>
                                    </div>
                                    <img src="/wm/wm_mobile1.png" alt="">
                                </div>
                            </div>
                        </div>
                        <div ref="laptopContainer" class=" lg:w-1/2 h-full ">
                                <img src="/wm/wm_computer.png" class="w-full ml-auto sm:absolute  lg:w-[45vw] 2xl:w-[35vw] min-w-[500px] max-w-none bottom-0 2xl:-bottom-5 left-0 -right-40 lg:left-0 xl:left-10 relative z-20"  alt="">
                        </div>
                        <div ref="logoWM" class="absolute bottom-4 right-4 lg:right-10 z-30 ">
                            <img src="/wm/wm_logo.png" alt="Wochenmarkt Logo" >

                        </div>
                    </div>
                    <div class="absolute w-full left-full top-0 col-span-1 items-center flex z-10 " >
                        <div class="relative flex items-start gap-2 -ml-50  h-[75vh] z-0  w-full "> 
                            <div ref="floatingTextContainer" class="px-4 pt-20 ">
                                <div ref="floatingText" class="text-base text-white font-family-averRegular">Aktionen</div>
                                <div class="border-b-2  border-white w-34"></div>
                            </div>
                            <div ref="floatingElements" class="flex flex-col gap-4 items-start absolute left-42 bottom-full -mb-60 w-full">
                                <img ref="smallElement1" class="h-34 w-auto" src="/wm/wm_gluecksrad_2023.png" alt="">
                                <img ref="smallElement2" class="h-34 w-auto" src="/wm/wm-az_2023.png" alt="">
                                <img ref="smallElement3" class="h-34 w-auto" src="/wm/wm_e-auto_2024.png" alt="">
                                <img ref="smallElement4" class="h-34 w-auto" src="/wm/wm_flaggen_2024.png" alt="">
                            </div>
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
import SVGOrange from "../SVG/Orange.vue";

gsap.registerPlugin(ScrollTrigger, SplitText);

const panelWochenMarkt = ref<HTMLElement | null>(null);
const boxContent = ref<HTMLElement | null>(null);
const whiteBorder = ref<HTMLElement | null>(null);
const laptopContainer = ref<HTMLElement | null>(null);
const mobileElement1 = ref<HTMLElement | null>(null);
const mobileElement2 = ref<HTMLElement | null>(null);
const floatingElements = ref<HTMLElement | null>(null);

const smallElement1 = ref<HTMLElement | null>(null);
const smallElement2 = ref<HTMLElement | null>(null);
const smallElement3 = ref<HTMLElement | null>(null);
const smallElement4 = ref<HTMLElement | null>(null);
const floatingTextContainer = ref<HTMLElement | null>(null);
const floatingText = ref<HTMLElement | null>(null);
const logoWM = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;

onMounted(() => {
    ctx = gsap.context(() => {
    const section = panelWochenMarkt.value;

    if (!section ) return;

        // Pin the section for 4 viewport heights
        const pinDuration = window.innerHeight * 4;
        const splitTitle = new SplitText(".titleText", { type: "words" });
        const splitContent= new SplitText(".mainText", { type: "words" });
/*         const orangeEl = orange.value;
        const textEl = leftText.value;
        const txt = textClp.value;
        const ln2 = line2.value;
        const sp1 = smallposter1.value;     
        const sp2 = smallposter2.value;
        const sp3 = smallposter3.value;
        const sp4 = smallposter4.value;
        const cpImg = computerImage.value; */

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

        tl.set(boxContent.value, { autoAlpha: 0 });
        tl.set(laptopContainer.value, { autoAlpha: 0 });
        tl.set(whiteBorder.value, { autoAlpha: 0 });
        tl.set(mobileElement1.value, { yPercent: 200 });
        tl.set(mobileElement2.value, { yPercent: 200 });
        tl.set(floatingElements.value, { y: 0, yPercent: -100 });
        tl.set(floatingTextContainer.value, { autoAlpha: 0 });
        tl.set(logoWM.value, { autoAlpha: 0, yPercent: -200 });
        tl.add("intro", 0);

    tl.fromTo(
    boxContent.value,
    { autoAlpha: 0, xPercent: -100, yPercent: 20, skewX: -10 },
    {
        autoAlpha: 1,
        xPercent: 0,
        yPercent: 0,
        skewX: 0,
        ease: "elastic.out(1,0.6)",
        duration: 2
    },
    "intro"
    );

    tl.fromTo(
    whiteBorder.value,
    { autoAlpha: 0, scale: 0.8 },
    {
        autoAlpha: 1,
        scale: 1,
        ease: "elastic.out(1,0.8)",
        duration: 1.6
    },
    "intro+=0.4"
    );

tl.from(
  splitTitle.words,
  {
    autoAlpha: 0,
    stagger: { amount: 0.3, from: "start" },
    ease: "power2.out",
    duration: 0.14
  },
  "intro+=0.8"
);

tl.from(
  splitContent.words,
  {
    autoAlpha: 0,
    stagger: { amount: 0.3, from: "start" },
    ease: "power2.out",
    duration: 0.14
  },
  "intro+=1.2"
);
tl.fromTo(
  mobileElement1.value,
  { yPercent: 200 },
  { yPercent: 0, duration: 0.6, ease: "power1.inOut" },
  "intro+=1.8"
);

tl.fromTo(
  mobileElement2.value,
  { yPercent: 200 },
  { yPercent: 0, duration: 0.6, ease: "power1.inOut" },
  "intro+=2.2"
);

tl.fromTo(
  mobileElement1.value,
  { yPercent: 0 },
  { yPercent: -200, duration: 1, ease: "power4.in" },
  "intro+=4.8"
);

tl.fromTo(
  mobileElement2.value,
  { yPercent: 0 },
  { yPercent: -300, duration: 1, ease: "power4.in" },
  "intro+=5.2"
);


 const smallElements = [
            smallElement1.value,
            smallElement2.value,
            smallElement3.value,
            smallElement4.value
        ];
        const gap = 40;
        const smallElementHeight = smallElements[0]?.offsetHeight || 0;
        const STEP = smallElementHeight + gap;
        const textLabels = ['Aktionen', 'Anzeigen', 'Fahrzeugbeklebung', 'Werbemittel'];

    tl.add("floating", "2.0");

    tl.fromTo(
    floatingTextContainer.value,
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 0.3 },
    "floating"
    );

    tl.fromTo(
    floatingElements.value,
    { yPercent: -100 },
    {
        yPercent: 0,
        duration: 0.6,
        onStart: () => {
        floatingText.value.textContent = textLabels[0];
        }
    },
    "floating"
    );

    tl.addPause("+=0.2");

    tl.fromTo(
    floatingElements.value,
    { yPercent: 0 },
    {
        y: STEP,
        yPercent: 0,
        duration: 0.6,
        onStart: () => {
        floatingText.value.textContent = textLabels[1];
        }
    }
    );

    tl.addPause("+=0.5");

    tl.fromTo(
    floatingElements.value,
    { y: STEP, yPercent: 0 },
    {
        y: STEP * 2,
        yPercent: 0,
        duration: 0.6,
        onStart: () => {
        floatingText.value.textContent = textLabels[2];
        }
    }
    );

    tl.addPause("+=0.5");

    tl.fromTo(
    floatingElements.value,
    { y: STEP * 2, yPercent: 0 },
    {
        y: STEP * 3,
        yPercent: 0,
        duration: 0.6,
        onStart: () => {
        floatingText.value.textContent = textLabels[3];
        }
    }
    );

    tl.fromTo(
    floatingTextContainer.value,
    { autoAlpha: 1 },
    { autoAlpha: 0, duration: 0.3 }
    );

    tl.fromTo(
    floatingElements.value,
    { y: STEP * 3, yPercent: 0 },
    {
        y: STEP * 3,
        yPercent: 200,
        duration: 0.6,
        ease: "power1.out"
    }
    );

    tl.add("laptop", ">+=0.4");

    tl.fromTo(
    laptopContainer.value,
    { autoAlpha: 0, xPercent: 100, skewX: 10 },
    {
        autoAlpha: 1,
        xPercent: 0,
        skewX: 0,
        ease: "power2.out",
        duration: 1.2
    },
    "intro+=5"
    );

    tl.fromTo(
    laptopContainer.value,
    { autoAlpha: 1, xPercent: 0, skewX: 0 },
    {
        autoAlpha: 0,
        xPercent: 100,
        skewX: 10,
        ease: "power2.in",
        duration: 0.6
    },
    "laptop+=0"
    );

    tl.fromTo(
    logoWM.value,
    { autoAlpha: 0, yPercent: -200 },
    { autoAlpha: 1, yPercent: 0, duration: 1.3, ease: "power2.out" },
       "laptop+=0.2"
    );

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

