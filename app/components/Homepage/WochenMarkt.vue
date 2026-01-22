<template>
    <section
    ref="panelWochenMarkt"
    class="relative min-h-screen w-full overflow-hidden relative"
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
       <div class="col-span-3 2xl:col-span-2 flex items-center ">
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
                <div ref="laptopContainer" class=" lg:w-1/2 h-full relative z-0">
                        <img src="/wm/wm_computer.png" class="w-full ml-auto sm:absolute  lg:w-[45vw] 2xl:w-[35vw] min-w-[500px] max-w-none bottom-0 2xl:-bottom-5 left-0 -right-40 lg:left-0 xl:left-10"  alt="">
                </div>
                </div>
            </div>
        </div>

        <div class="col-span-1 items-center flex " >
            <div class="relative  flex items-start gap-2 -ml-48  h-[75vh] z-10  w-full"> 
                <div ref="floatingTextContainer" class="px-4 pt-20 ">
                    <div ref="floatingText" class="text-base text-white font-family-averRegular">Aktionen</div>
                    <div class="border-b-2  border-white w-30"></div>
                </div>
                <div ref="floatingElements" class="flex flex-col gap-4 items-start absolute left-40 bottom-full -mb-60 w-full">
                    <img ref="smallElement1" class="h-34 w-auto" src="/wm/wm_gluecksrad_2023.png" alt="">
                    <img ref="smallElement2" class="h-34 w-auto" src="/wm/wm-az_2023.png" alt="">
                    <img ref="smallElement3" class="h-34 w-auto" src="/wm/wm_e-auto_2024.png" alt="">
                    <img ref="smallElement4" class="h-34 w-auto" src="/wm/wm_flaggen_2024.png" alt="">
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
        duration: 1.2
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
        duration: 0.8
    },
    "intro+=0.4"
    );

tl.from(
  splitTitle.words,
  {
    autoAlpha: 0,
    stagger: { amount: 0.1, from: "start" },
    ease: "power2.out",
    duration: 0.14
  },
  "intro+=0.8"
);

tl.from(
  splitContent.words,
  {
    autoAlpha: 0,
    stagger: { amount: 0.1, from: "start" },
    ease: "power2.out",
    duration: 0.08
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
  { yPercent: -200, duration: 0.6, ease: "power4.in" },
  "intro+=4.8"
);

tl.fromTo(
  mobileElement2.value,
  { yPercent: 0 },
  { yPercent: -300, duration: 0.6, ease: "power4.in" },
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

    tl.add("floating", "3.0");

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
        duration: 0.5,
        onStart: () => {
        floatingText.value.textContent = textLabels[0];
        }
    },
    "floating"
    );

    tl.addPause("+=0.5");

    tl.fromTo(
    floatingElements.value,
    { yPercent: 0 },
    {
        y: STEP,
        yPercent: 0,
        duration: 0.5,
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
        duration: 0.5,
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
        duration: 0.5,
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
        duration: 0.5,
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
        duration: 0.6
    },
    "intro+=4"
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
    "laptop+=1"
    );



     /*    tl.fromTo(boxContent.value, 
            { autoAlpha: 0 ,xPercent: -100, yPercent: 20, skewX: -10  },
            { autoAlpha: 1 , xPercent: 0, yPercent: 0, skewX: 0, ease: 'elastic.out(1,0.6)', duration: 0.6 },
            0
        );
        tl.fromTo(whiteBorder.value, 
            { autoAlpha: 0 , scale: 0.8  },
            { autoAlpha: 1 , scale: 1, ease: 'elastic.out(1,0.8)', duration: 0.6 },
            0.1
        );

        tl.from(splitTitle.words, {
            autoAlpha: 0,
            stagger: {
                amount: 0.1,
                from: "start"
            },
            ease: "power2.out",
            duration: 0.08,
            }, 0.2);

        tl.from(splitContent.words, {
            autoAlpha: 0,
            stagger: {
                amount: 0.1,
                from: "start"
            },
            ease: "power2.out",
            duration: 0.2,
            }, 0.4);
            
        tl.fromTo(laptopContainer.value, 
            { autoAlpha: 0 , xPercent: 100, skewX: 5  },
            { autoAlpha: 1 , xPercent: 0,  skewX: 0, ease: 'power2.out', duration: 0.4 },
            2.6);

        tl.fromTo(mobileElement1.value, 
            { autoAlpha: 1 , yPercent: 200  },
            { autoAlpha: 1 , yPercent: 0, ease: 'power1.inOut', duration: 0.6 },
            0.3);   
        tl.fromTo(mobileElement2.value, 
            { autoAlpha: 1 , yPercent: 200  },
            { autoAlpha: 1 , yPercent: 0, ease: 'power1.inOut', duration: 0.6 },
            0.8);
        
        tl.fromTo(mobileElement1.value, 
            { autoAlpha: 1 , yPercent: 0  },
            { autoAlpha: 1 , yPercent: -200, ease: 'power1.inOut', duration: 0.5 },
            2);   
        tl.fromTo(mobileElement2.value, 
            { autoAlpha: 1 , yPercent: 0  },
            { autoAlpha: 1 , yPercent: -300, ease: 'power1.inOut', duration: 0.5 },
            2.6);
        tl.fromTo(laptopContainer.value, 
            { autoAlpha: 1 , xPercent: 0  },
            { autoAlpha: 0 , xPercent: 100, ease: 'power2.in', duration: 0.4 },
          4  );
        
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
                tl.fromTo(floatingTextContainer.value, 
                            { autoAlpha: 0 },
                            { autoAlpha: 1, duration: 0.3 }, 1.5);
                tl.fromTo(
                    floatingElements.value,
                    { y: 0, yPercent: -100 },
                    {
                        yPercent: 0,
                        y: 0,
                        duration: 0.5,
                        onUpdate: () => {
                            if (floatingTextContainer.value) floatingText.value.textContent = textLabels[0];
                           
                        },
                    }, 1
                )
                .addPause("+=0.5")

                .fromTo(
                    floatingElements.value,
                    { y: 0, yPercent: 0 },
                    {
                        y: STEP,
                        duration: 0.5,
                        onUpdate: () => {
                            if (floatingText.value) floatingText.value.textContent = textLabels[1];
                        }
                    }
                )
                .addPause("+=0.5")

                .fromTo(
                    floatingElements.value,
                    { y: STEP },
                    {
                        y: STEP * 2,
                        duration: 0.5,
                        onUpdate: () => {
                            if (floatingText.value) floatingText.value.textContent = textLabels[2];
                        }
                    }
                )
                .addPause("+=0.5")

                .fromTo(
                    floatingElements.value,
                    { y: STEP * 2 },
                    {
                        y: STEP * 3,
                        duration: 0.5,
                        onUpdate: () => {
                            if (floatingText.value) floatingText.value.textContent = textLabels[3];
                        },
                    }
                )
                .fromTo(floatingTextContainer.value, 
                            { autoAlpha: 1 },
                            { autoAlpha: 0, duration: 0.3 })

                .fromTo(
                floatingElements.value,
                    { y: STEP * 3, yPercente: 0 },
                    {
                        y: STEP * 3,
                        yPercent: 200,
                        ease: 'power1.out',
                        duration: 0.5,
                        onUpdate: () => {
                            if (floatingText.value) floatingText.value.textContent = textLabels[3];
                        },
                    }
                );
 */

        // Animate the orange SVG circle
      /*  tl.set(orangeEl, { yPercent: -100 });
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

         tl.from(splitTitle.words, {
            autoAlpha: 0,
            stagger: {
                amount: 0.1,
                from: "start"
            },
            ease: "power2.out",
            duration: 0.08,
            }, 0.7);

        tl.from(splitContent.words, {
            autoAlpha: 0,
            stagger: {
                amount: 0.1,
                from: "start"
            },
            ease: "power2.out",
            duration: 0.08,
            }, 0.8);
    
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

