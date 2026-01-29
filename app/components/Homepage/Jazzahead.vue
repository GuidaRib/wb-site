<template>
    <section
    ref="panelJazz"
    class="relative h-screen overflow-hidden bg-white"
    >
    <!-- Background image panel -->
    <div
        ref="background"
        class="absolute left-0 w-full lg:w-1/2 h-screen z-0 top-0"
    >
        <img
        src="/jazzahead/ja_background.jpg"
        class="w-full h-full object-cover object-right"
        alt=""
        />
    </div>

   
    <div ref="arrowblur" class="z-20 absolute backdrop-blur-md  top-1/2 -translate-y-1/2  h-1/3 lg:h-3/5 w-full"
      style="mask-image: url('/jazzahead/ja_arrowbackground.svg'); 
                   mask-size: contain; 
                   mask-repeat: no-repeat; 
                   mask-position: center;
                   -webkit-mask-image: url('/jazzahead/ja_arrowbackground.svg');
                   -webkit-mask-size: contain;
                   -webkit-mask-repeat: no-repeat;
                   -webkit-mask-position: center;"
                   >
    </div>
    <!-- Arrow / overlay panel -->
    <div
        ref="arrow"
        class="absolute z-20  top-1/2 -translate-y-1/2 h-1/3 lg:h-3/5 w-full"
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
            ref="mainContent"
            class="grid grid-cols-1 lg:grid-cols-5 2xl:grid-cols-4 w-full h-full z-10"
        >

            <div class="">
                
            </div>
            <div class="col-span-3 2xl:col-span-2 flex items-center relative z-0  h-screen">
                <div ref="boxContent" class="col-span-2 grid grid-cols-2 bg-white justify-between border-2 p-5 z-20 sm:h-[75vh] w-full">
                    <div class="flex justify-between flex-col relative z-30">
                            <span ref="year" class="w-34 break-all text-8xl font-family-averBlack">2026</span> 
                          <div class="relative  pb-38">
                                <div ref="floatingTextContainer">
                                    <span ref="floatingText" class="text-base font-family-averRegular">CLP</span>
                                    <div ref="line2" class="border-l-2 mb-8 h-10"></div>
                                </div>
                                <div ref="floatingElements" class="h-38 absolute bottom-0 right-full -mr-50 overflow-visible flex flex-row-reverse gap-4 w-full ">
                                    <img ref="smallElement1" class="h-38 w-auto" src="/jazzahead/ja_clp.png" alt="" >
                                    <img ref="smallElement2" class="h-38 w-auto" src="/jazzahead/ja_clp_big.png"  alt="" >
                                    <img ref="smallElement3" class="h-38 w-auto"  src="/jazzahead/ja_beer.png" alt="" >
                                    <img ref="smallElement4" class="h-38 w-auto"  src="/jazzahead/ja_programheft.png" alt="" >
                                </div> 
                            </div>
                        
                        </div> 
                
                        <div ref="posterContainer" class="relative col-span-1 w-full z-20 flex items-center justify-center">
                            <img
                                src="/jazzahead/ja_poster2026.jpg"
                                class="absolute object-contain w-full h-auto poster shadow-lg "
                                alt="Jazzahead 2026 Poster"
                                data-year="2026"
                            />
                            <img
                                src="/jazzahead/ja25-poster.jpg"
                                class="absolute object-contain w-full h-auto poster shadow-lg "
                                alt="Jazzahead 2025 Poster"
                                data-year="2025"
                            />
                            <img src="/jazzahead/ja24-poster.jpg" 
                                alt="Jazzahead 2024 Poster" 
                                class="absolute object-contain w-full h-auto poster shadow-lg" 
                                data-year="2024"/>
                            <img
                                src="/jazzahead/ja23-poster.jpg"
                                class="absolute object-contain w-full h-auto poster shadow-lg "
                                alt="Jazzahead 2023 Poster"
                                data-year="2023"
                            />
                            <img
                                src="/jazzahead/ja22-poster.jpg"
                                class="absolute object-contain w-full h-auto poster shadow-lg "
                                alt="Jazzahead 2022 Poster"
                                data-year="2022"
                            />
                    </div>
                </div>
            </div>
            <div class="col-span-1 flex items-center ">
                <div  class="relative text text-base lg:max-w-72 font-family-averRegular flex items-start z-10 px-5 sm:h-[75vh]">
                    <div ref="mainText" class="mainText relative">
                        <p>jazzahead! ist seit 20 Jahren als Fachmesse und Festival international bekannt.  Die Besucher kommen aus 64 Ländern – schwerpunktmäßig aus dem europäischen Ausland.</p> 

                        <p><span class="font-family-averBold">Wir begleiten das Festival und die Fachmesse jazzahead! seit 2026</span> mit jählich neuem Erscheinungsbild und einem gestalterischen <span class="font-family-averBold">Rundum-Paket für sämtliche Maßnahmen der Kampagne.</span> </p>

                        <div class="absolute left-0  top-full flex flex-col gap-4 ">
                            <div ref="line" class="border-l-2  h-14">

                            </div>
                            <img ref="posterClubnight" src="/jazzahead/ja_posterClubnight.jpg" alt="Jazzahead Poster Clubnight" class="w-full h-auto max-w-610 -ml-20">
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
const boxContent = ref<HTMLElement | null>(null);
const posterContainer = ref<HTMLElement | null>(null);
const year = ref<HTMLElement | null>(null);
const line = ref<HTMLElement | null>(null);
const posterClubnight = ref<HTMLElement | null>(null);
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
    const section = panelJazz.value;
    const posters = gsap.utils.toArray('.poster') as HTMLElement[] | undefined;
    

    if (!section ) return;

        // Pin the section for 4 viewport heights

        const pinDuration = window.innerHeight * 4;
        const splitContent= new SplitText(".mainText", { type: "words" });
        const split = new SplitText(".text", { type: "words" });
        const shortFadeDur = 0.3;
        const midFadeDur = 0.6;
        const longFadeDur = 1.0;
        
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
    tl.set(background.value, {  xPercent: 0 });
    tl.set(arrow.value, { autoAlpha: 0, left: '-60%' });
    tl.set(arrowblur.value, { autoAlpha: 0, left: '-60%'});
    tl.set(boxContent.value, { autoAlpha: 0, y: -20});
    tl.set(line.value, { height: 0 });
    tl.set(posterClubnight.value, { autoAlpha: 0, yPercent: 50 });
    tl.set(floatingElements.value, { x: -1500, autoAlpha: 0 });
    tl.set(floatingTextContainer.value, { autoAlpha: 0 });
    

    tl.add("intro", 0);
    tl.add("content", 0.7);

    /* INTRO */

    tl.fromTo(background.value, 
        { xPercent: 200 },
        {  xPercent: 0, ease: 'power3.Out', duration: midFadeDur }, 
          "intro"
    );
    tl.fromTo(arrow.value, 
        { autoAlpha: 0, left: '-60%' },
        { autoAlpha: 1, left: '0%', ease: 'power2.inOut', duration: midFadeDur }, 
        "intro+=0.2"
    ); 
        tl.fromTo(arrowblur.value, 
        {  left: '-60%' },
        { autoAlpha: 1, left: '0%', ease: 'power2.inOut', duration: midFadeDur }, 
        "intro+=0.2"
    ); 

    tl.fromTo(
        boxContent.value,
        { autoAlpha: 0 },
        {
            autoAlpha: 1,
            ease: "none",
            y: 0,
            duration: shortFadeDur
        },
        "intro+=0.6"
    );

    /* POSTERS */
  
    const rev = posters.slice();
    const fadeDur = midFadeDur;

    // hide all posters
    gsap.set(rev, { autoAlpha: 0 });

    // initial year = bottom poster
    if (year.value) {
    year.value.textContent = rev[0].dataset.year;
    }

    const postersTL = gsap.timeline();

    rev.forEach((poster) => {
        postersTL.to(poster, {
            autoAlpha: 1,
            duration: fadeDur,
            ease: 'power2.inOut',
            onUpdate() {
            // switch year when opacity passes 0.5
            if (this.progress() >= 0.5 && year.value) {
                year.value.textContent = poster.dataset.year;
            }
            }
        });
    });

    tl.add(postersTL, "content");

    /* TEXT + CLUBNIGHT POSTER IN */

    tl.from(
        splitContent.words,
        {
            autoAlpha: 0,
            stagger: { amount: 0.3, from: "start" },
            ease: "power2.out",
            duration: 0.14
        },
        "content+=0.2",
    );

    tl.fromTo(line.value, 
        { height: 0 },
        { height: 49, ease: 'none', duration: shortFadeDur }, 
        "content+=0.6"
    );
    tl.fromTo(posterClubnight.value, 
        { autoAlpha: 0, yPercent: 50 },
        { autoAlpha: 1, yPercent: 0, duration: shortFadeDur }, 
        "content+=1"
    );

    /* FLOATING ELEMENTS SEQUENCE */

    const smallElements = [
        smallElement1.value,
        smallElement2.value,
        smallElement3.value,
        smallElement4.value
    ];
    const gap = 40;
    const smallElementWidth = smallElements[0]?.offsetWidth || 0;
    console.log('Small Element Width:', smallElementWidth);
    const STEP = smallElementWidth + gap;
    const textLabels = ['CLP', 'Grossfläche', 'Merchandise', 'Programheft'];

    tl.add("floating", "content+=1");

    tl.fromTo(
    floatingTextContainer.value,
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: shortFadeDur },
    "floating"
    );

    tl.fromTo(
    floatingElements.value,
    { x: -1500, autoAlpha: 0 },
    {
        x: 0,
        autoAlpha: 1,
        duration: shortFadeDur,
        onStart: () => {
        floatingText.value.textContent = textLabels[0];
        }
    },
    "floating"
    );



    tl.fromTo(
    floatingElements.value,
    { x: 0 },
    {
        x: STEP,
        duration: shortFadeDur,
        onStart: () => {
        floatingText.value.textContent = textLabels[1];
        }
    }, "floating+=0.6"
    );



    tl.fromTo(
    floatingElements.value,
    { x: STEP},
    {
        x: STEP * 2,
        duration: shortFadeDur,
        onStart: () => {
        floatingText.value.textContent = textLabels[2];
        }
        }, "floating+=1.2"
    );


    tl.fromTo(
    floatingElements.value,
    { x: STEP * 2 },
    {
        x: STEP * 3,
        duration: shortFadeDur,
        onStart: () => {
        floatingText.value.textContent = textLabels[3];
        }
        }, "floating+=1.8"
    );

    tl.fromTo(
    floatingTextContainer.value,
    { autoAlpha: 1 },
    { autoAlpha: 0, duration: shortFadeDur }, 
    "floating+=2.2"
    );

    tl.fromTo(
    floatingElements.value,
    { x: STEP * 3, autoAlpha: 1 },
    {
        x: 3000,
        autoAlpha: 0,
        duration: midFadeDur,
        ease: "power1.out"
    },
    "floating+=2.2"
    ); 

    tl.fromTo(posterClubnight.value, 
        { autoAlpha: 1, yPercent: 0 },
        { autoAlpha: 0, yPercent: 50, duration: shortFadeDur }, 
          "floating+=2.2"
    );

    tl.fromTo(line.value, 
        { height: 49 },
        { height: 0, ease: 'none', duration: shortFadeDur }, 
         "floating+=2.2"
    );

    tl.fromTo(
        posterContainer.value,
        { autoAlpha: 1 },
        {
            autoAlpha: 0,
            ease: "none",
            y: 10,
            duration: shortFadeDur
        },
           "floating+=2.8"
    );

    tl.fromTo(
        background.value,
        { autoAlpha: 1 },
        {
            ease: "power2.out",
            xPercent: 200,
            duration: midFadeDur
        },
        "floating+=3.2"
    );


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

