<template>
    <section
    ref="panelBoecker"
    class="min-h-screen w-full overflow-hidden relative"
    >   
        <div class="grid grid-cols-1 lg:grid-cols-5  w-full h-full ">
            <div ref="leftElementContainer" class="col-span-1 2xl:col-span-1 flex flex-row mt-auto justify-start  items-start gap-2 z-20 absolute bottom-0 2xl:relative p-10">
                <div ref="leftElement" class="left-20 p-4 bg-[#B687FF] rounded-bl-3xl min-w-30 2xl:min-w-36">
                    <img src="/boecker/bo_element_left.png" alt="">
                </div>
                <div ref="leftElementText"class="flex flex-row gap-2">
                    <div ref="leftElementLine" class="border-t-2 w-20">

                    </div>
                    <div ref="leftElementTitle" class="text-base font-family-averRegular uppercase -mt-3">
                        Sauerteig Aromen
                    </div>

                </div>

            </div>
            <div ref="mainContent" class="col-span-2 col-start-1 lg:col-span-3 flex flex-col justify-center items-center relative z-10  ">
                <div ref="topCover" class="w-full h-30 bg-white z-50">   </div>
                <div class="relative overflow-hidden "> 
                    <img src="/boecker/bo_laptop_nn.png" alt="" class="relative z-20 h-auto w-fulll mx-auto object-contain">
                   
                        <img ref="website" src="/boecker/bo_website.jpg" class="w-[78vw] lg:w-[47vw] 2xl:w-[47vw] h-auto absolute top-0 left-1/2 -translate-x-1/2 z-10  " alt=""> 

                    <div ref="logo" class="w-[78vw] lg:w-[39vw] 2xl:w-[47vw] h-auto absolute top-1/2 left-1/2 -translate-1/2  flex items-center justify-center z-40 pb-10"> 
                            <img src="/boecker/bo_logo_n.png" class="object-contain" alt="">
                        </div> 
                </div>
                <div ref="topCover" class="w-full h-30 bg-white z-50">   </div>
            </div>

            <div class="col-span-2 2xl:col-span-1 2xl:-ml-14 flex flex-col i justify-end z-20 ">
                <div class="flex flex-col justify-between mb-10 gap-2 3xl:gap-2 px-5 lg:pl-0 ">
                    <div ref="mainText" class="mainText w-full text-base font-family-averRegular">
                        <p>Die Ernst Böcker GmbH ist ein traditionsreiches Familienunternehmen und international anerkannter Spezialist Sauerteig-Produkte und Fermentations-lösungen. Seit Generationen steht Böcker für höchste Qualität, handwerkliche Kompetenz und Innovationskraft.</p>
                        <p>Wir sind <span class="font-family-averBold">ganzheitlicher Marketing-partner</span> von BÖCKER. Vom <span class="font-family-averBold">strategischen Brand-Design</span> über eine moderne Webseite und einen leistungsstarken Online-Shop bis hin zu wirkungsvoller Social-Media-Kommunikation sorgen wir für einen konsistenten und starken Markenauftritt.</p>          
                    </div>
                    <div ref="mainTextLine" class="border-l-2 h-20 ml-1"></div>
                    <div>
                        <div ref="floatingTextContainer"class=" w-full flex flex-col gap-4 justify-start h-20">
                            <div ref="floatingText" class="text-base font-family-averRegular min-w-2 pt-1">BÖCKER Social Media B2C und B2B</div>
                            <div ref="floatingTextLine" class="border-l-2 h-40 ml-1"></div>
                        </div>
                        <div ref="floatingElements" class="overflow-visible flex gap-10  relative w-full mt-1">
                            <img ref="smallElement1" class="object-contain h-48 2xl:h-54 w-auto z-80" src="/boecker/bo_socialmedia.png" alt="">
                            <img ref="smallElement2" class="object-contain h-48 2xl:h-54 w-auto z-80" src="/boecker/bo_languages.png" alt="">
                            <img ref="smallElement3" class="object-contain h-48 2xl:h-54 w-auto z-80" src="/boecker/bo_verpackung.png" alt="">
                            <img ref="smallElement4" class="object-contain h-48 2xl:h-54 w-auto z-80" src="/boecker/bo_etiketten.png" alt="">
                            <img ref="smallElement5" class="object-contain h-48 2xl:h-54 w-auto z-80" src="/boecker/bo_messe.png" alt="">
                        </div> 
                    </div>
                </div>
            </div>
         <img ref="graphics" src="/boecker/bo_graphics.png" alt="" class="absolute w-1/2 h-auto top-10 2xl:top-1/2  left-1/4 2xl:left-0 -translate-y-1/2 z-40 2xl:z-0"> 
        </div>
    </section>
</template>

<script setup lang="ts">
import { gsap, interpolate } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ref, onMounted, onUnmounted, nextTick } from "vue";

gsap.registerPlugin(ScrollTrigger, SplitText);

const panelBoecker= ref<HTMLElement | null>(null);
const mainContent= ref<HTMLElement | null>(null);
const website= ref<HTMLElement | null>(null);
const logo= ref<HTMLElement | null>(null);
const mainTextLine= ref<HTMLElement | null>(null);
const mainText= ref<HTMLElement | null>(null);
const leftElementContainer= ref<HTMLElement | null>(null);
const leftElement= ref<HTMLElement | null>(null);
const leftElementLine= ref<HTMLElement | null>(null);
const leftElementTitle= ref<HTMLElement | null>(null);
const floatingTextContainer= ref<HTMLElement | null>(null);
const floatingText= ref<HTMLElement | null>(null);
const floatingTextLine= ref<HTMLElement | null>(null);
const floatingElements= ref<HTMLElement | null>(null);
const smallElement1= ref<HTMLElement | null>(null);
const smallElement2= ref<HTMLElement | null>(null);
const smallElement3= ref<HTMLElement | null>(null);
const smallElement4= ref<HTMLElement | null>(null);
const smallElement5= ref<HTMLElement | null>(null);
const graphics= ref<HTMLElement | null>(null);
const topCover= ref<HTMLElement | null>(null);


/*const mainTextLine= ref<HTMLElement | null>(null);
const leftElement= ref<HTMLElement | null>(null);
const leftElementText= ref<HTMLElement | null>(null);

    
const graphics= ref<HTMLElement | null>(null);
; */



let ctx: gsap.Context | null = null;



onMounted(() => {

ctx = gsap.context(() => {
    const section = panelBoecker.value;
/*     const content = mainContent.value;
    const site = website.value;
    const textEl = text.value;
    const textLine = line.value;
    const leftEl = leftElement.value;
    const leftText = leftElementText.value;
    const textPosters = textClp.value;
    const linePosters = line2.value;
    const graphicsEl = graphics.value;
    const posters = smallposterRefs.map(ref => ref.value).filter(Boolean);
    const logoEl = logo.value; */

    if (!section ) return;

    // Pin the section for 4 viewport heights
    const pinDuration = window.innerHeight * 5;
    const split = new SplitText(mainText.value, { type: "words" });
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
            end: () => `+=${pinDuration + window.innerHeight}`,
            scrub: true,
        }
    });

    tl.set(mainContent.value, {  y: 400 });
    tl.set(topCover.value, { autoAlpha: 0 });
    tl.set(website.value, { y: 0, autoAlpha: 0 });
    tl.set(leftElementContainer.value, { autoAlpha: 1 });
    tl.set(leftElement.value, { x: -100, autoAlpha: 0 });
    tl.set(leftElementTitle.value, { y: 50, autoAlpha: 0 });
    tl.set(leftElementLine.value, { width: 0 });
    tl.set(mainTextLine.value, { height: 0 });
    tl.set(floatingText.value, { y: 50, autoAlpha: 0 });
    tl.set(floatingTextLine.value, { height: 0 });
    tl.set(floatingElements.value, { x: 1500, autoAlpha: 0 });
    tl.set(graphics.value, { x: 500, autoAlpha: 0 });
    tl.set(logo.value, { autoAlpha: 0 });

    tl.add("intro", 0);

    tl.fromTo(mainContent.value,
        { y: 400 },
        { y: 0, ease: 'power3.out', duration: shortFadeDur }, "intro+=0.1");
    tl.fromTo(topCover.value,
        { autoAlpha: 0, },
        { autoAlpha: 1, duration: midFadeDur }, "intro+=0.3");
    tl.fromTo(website.value,
        { autoAlpha: 0, },
        { autoAlpha: 1, duration: midFadeDur }, "<");

    tl.from(split.words, {
        y: 100,
        autoAlpha: 0,
        stagger: {
            amount: 0.1,
            from: "start"
        },
        ease: "power2.out",
        duration: 0.12,
    }, "intro+=0.4");

    tl.fromTo(mainTextLine.value, { height: 0 }, { height: 60, ease: 'none', duration: 0.1 }, "intro+=0.5");

    tl.fromTo(website.value,
        { y: 0 },
        { y: -2700, ease: 'power3.in', duration: 3 }, ">");

     tl.fromTo(website.value,
        { autoAlpha: 1, },
        { autoAlpha: 0, duration: "0.2" }, "intro+=3.4");

    tl.fromTo(logo.value,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: midFadeDur }, "intro+=3.4");

    tl.fromTo(leftElement.value,
        { x: -100, autoAlpha: 0 },
        { x: 0, autoAlpha: 1, ease: 'power3.out', duration: shortFadeDur }, "intro+=0.6");
    
    tl.to(leftElement.value, {
        backgroundColor: '#FFED35',
        duration: 1.5,
        ease: 'power1.inOut',
    }, "intro+=1.0"); // Start after leftEl is visible

    tl.fromTo(leftElementLine.value, { width: 0 }, { width: 60 , ease: 'none', duration: 0.1 }, "intro+=0.8");

    tl.fromTo(leftElementTitle.value,
        { y: -20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, ease: 'power3.out', duration: shortFadeDur }, "intro+=1.0"); 
    
    tl.fromTo(leftElementContainer.value,
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: shortFadeDur }, "intro+=3");;

    tl.fromTo(graphics.value, 
    { x: 500, autoAlpha: 0 },
    { x: 0, autoAlpha: 1, ease: 'power3.out', duration: 1.0 }, 
    "intro+=0.7");

    // Reverse graphicsEl after a few seconds
    tl.fromTo(graphics.value, 
    { x: 0, autoAlpha: 1 },
        { x: 500, autoAlpha: 0, ease: 'power3.inOut', duration:0.5},
        "intro+=3"
    );

    tl.fromTo(floatingText.value,
        { y: 50, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, ease: 'power3.out', duration: shortFadeDur }, "intro+=0.6");

    tl.fromTo(floatingTextLine.value, { height: 0 }, { height: 40, ease: 'none', duration: 0.1 }, "intro+=0.6");
    
    /* FLOATING ELEMENTS SEQUENCE */

    const smallElements = [
        smallElement1.value,
        smallElement2.value,
        smallElement3.value,
        smallElement4.value
    ];
    const gap = 40;
    const smallElementWidth = smallElements[0]?.offsetWidth || 0;
 
    const STEP = smallElementWidth + gap;
    const textLabels = ['BÖCKER Social Media B2C und B2B', 'Sourdough Language', 'BÖCKER Sauerteig Verpackung', 'BÖCKER sauerteig Etiketten', 'BÖCKER Messeständer'];

    tl.add("floating", "intro+=0.6");

    tl.fromTo(
    floatingElements.value,
    { x: 1500, autoAlpha: 0 },
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
        x: -STEP,
        duration: shortFadeDur,
        onStart: () => {
        floatingText.value.textContent = textLabels[1];
        }
    }, "floating+=0.5"
    );

    tl.fromTo(
    floatingElements.value,
    { x: -STEP},
    {
        x: -STEP * 2,
        duration: shortFadeDur,
        onStart: () => {
        floatingText.value.textContent = textLabels[2];
        }
        }, "floating+=1"
    );

    
    tl.fromTo(
        floatingElements.value,
        { x: -STEP * 2 },
        {
            x: -STEP * 3,
            duration: shortFadeDur,
            onStart: () => {
            floatingText.value.textContent = textLabels[3];
            }
            }, "floating+=1.5"
    );
    
    tl.fromTo(
        floatingElements.value,
        { x: -STEP * 3 },
        {
            x: -STEP * 4,
            duration: shortFadeDur,
            onStart: () => {
            floatingText.value.textContent = textLabels[3];
            }
            }, "floating+=2"
    );

    tl.fromTo(
        floatingTextContainer.value,
        { autoAlpha: 1 },
        { autoAlpha: 0, duration: shortFadeDur }, 
        "floating+=2.5"
    );

    tl.fromTo(
    floatingElements.value,
    { x: -STEP * 4, autoAlpha: 1 },
    {
        x: -3000,
        autoAlpha: 0,
        duration: midFadeDur,
        ease: "power1.out"
    },
    "floating+=2.5"
    );  

    /* tl.set(textLine, { height: 0 });
    tl.set(linePosters, { height: 0 });
    tl.set(textPosters, { opacity: 0 });
    tl.set(graphicsEl, { x: 0, autoAlpha: 0 });
    tl.set(logoEl, { autoAlpha: 0 });

    posters.forEach((p, i) => {
        gsap.set(p, { left: '200%', autoAlpha: i < 2 ? 1 : 0 });
    });

    tl.fromTo(content,
        { height: 0, y: 400 },
        { height: 'auto', y: 0, ease: 'power3.out', duration: 0.35 }, 0.1);

    tl.fromTo(site,
        { opacity: 0, },
        { opacity: 1, duration: 0.5 }, 0.4);

    tl.fromTo(site,
        { y: 0 },
        { y: -3000, ease: 'power3.in', duration: 2.5 }, 0.5);

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

    // 6) line grows
    tl.to(textLine, { height: 60, ease: 'none', duration: 0.1 }, 0.7);

    tl.fromTo(leftEl,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, ease: 'power3.out', duration: 0.35 }, 0.6);
    // Animate background color from #B687FF to #FFED35
    tl.to(leftEl, {
        backgroundColor: '#FFED35',
        duration: 1.5,
        ease: 'power1.inOut',
    }, 1.2); // Start after leftEl is visible

    tl.fromTo(leftText,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power3.out', duration: 0.35 }, 0.6);

    tl.fromTo(graphicsEl, 
    { x: 0, autoAlpha: 0 },
    { x: -500, autoAlpha: 1, ease: 'power3.out', duration: 1.0 }, 
    1.3);

    // Reverse graphicsEl after a few seconds
    tl.fromTo(graphicsEl, 
    { x: -500, autoAlpha: 1 },
        { x: -0, autoAlpha: 0, ease: 'power3.inOut', duration:0.5},
        2.6 // 2 seconds after the first animation starts
    );
    tl.to(linePosters, { height: 40, ease: 'none', duration: 0.1 }, 1.2);
    tl.to(textPosters, { opacity: 1, ease: 'none', duration: 0.1 }, 1.2);
    // Poster animation logic (cleaned up)
    if (posters.length ) {
        const gap = 40;
        const targetLeft = 0;
        const widths = posters.map(p => {
            const el = Array.isArray(p) ? p[0] : p;
            return el?.offsetWidth || 80;
        });
  
        // Phase 1: Animate to first stop (from right)
        posters.forEach((p, i) => {
            const el = Array.isArray(p) ? p[0] : p;
            // Position is sum of previous widths + gap
            const position = i === 0 ? targetLeft : widths.slice(0, i).reduce((acc, w) => acc + w + gap, targetLeft);
            tl.fromTo(
                el,
                { left: '200%' },
                { left: position, autoAlpha: 1, ease: 'power2.out', duration: 0.15 },
                1.2 + i * 0.08
            );
        });
        // Phase 2/3: Move all posters together to the left, update text, repeat as needed
        let prevPositions = posters.map((_, i) => i === 0 ? targetLeft : widths.slice(0, i).reduce((acc, w) => acc + w + gap, targetLeft));
        for (let phase = 1; phase < posters.length; phase++) {
            const time = 1.0 + (posters.length - 1) * 0.08 + 0.15 + (phase - 1) * (0.2 + 0.1);
            const newPositions = prevPositions.map((pos, i) => {
                if (i < phase) {
                    // Move left by its own width+gap
                    return pos - widths[i] - gap;
                } else if (i === phase) {
                    // Move to targetLeft
                    return targetLeft;
                } else {
                    // Move right by its own width+gap
                    return pos + widths[i] + gap;
                }
            });
            posters.forEach((p, i) => {
                const el = Array.isArray(p) ? p[0] : p;
                tl.fromTo(
                    el,
                    { left: prevPositions[i] },
                    { left: newPositions[i], ease: 'power1.inOut', duration: 0.2 },
                    time
                );
            });
            prevPositions = newPositions;
        }
        // Phase 4: Move all images off-screen to the left and clear text
         const time4 = 1.0 + (posters.length - 1) * 0.08 + 0.15 + (posters.length - 1) * (0.2 + 0.1) + 0.2 + 0.15;
        const exitDur = 0.3;
        posters.forEach((p, i) => {
            const el = Array.isArray(p) ? p[0] : p;
            tl.fromTo(
                el,
                { left: prevPositions[i] },
                { left: prevPositions[i] - 2000, ease: 'power2.in', duration: exitDur },
                time4
            );
        });
        // Text tracking
        const textProgress = { value: 0 };
        const textStartTime = 1.0 + (posters.length - 1) * 0.08;
        const textEndTime = time4
        tl.fromTo(
            textProgress,
            { value: 0 },
            {
                value: posters.length,
                duration: textEndTime - textStartTime,
                ease: 'none',
                onUpdate: () => {
                    const idx = Math.min(posters.length, Math.max(0, Math.round(textProgress.value)));
                    // Do not clear text when idx === posters.length, keep last label until fade is done
                    if (idx < posters.length) {
                        textPosters.textContent = posterLabels[idx] || '';
                    }
                }
            },
            textStartTime
        );
        // After fade out, clear the text content
        tl.call(() => {
            if (textPosters) textPosters.textContent = '';
        }, null, textEndTime + 0.5); // 0.5s is the fade duration
        // Fade out textPosters at the end
        tl.to(
            textPosters,
            { opacity: 0, duration: 0.5, ease: 'power1.inOut' },
            3// start fade out right after text finishes
        );
    }

      tl.to(linePosters, { height: 0, ease: 'none', duration: 0.1 }, 3.2);
      tl.fromTo(site, { opacity: 1 },   { opacity: 0, duration: 0.5 }, 3);
        tl.fromTo(logoEl, { autoAlpha: 0 },  { autoAlpha: 1, duration: 0.5 }, 3); */

    }, panelBoecker.value);
});

onUnmounted(() => {
  ctx?.revert();
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<style scoped>
/* Initial states now managed by GSAP for reliability */
</style>

