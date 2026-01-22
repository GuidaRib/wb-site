<template>
    <section
    ref="panelBoecker"
    class="relative h-screen overflow-hidden p-20 grid grid-cols-7"
    >
    <div class="flex flex-row mt-auto justify-start  items-start gap-2 z-20">

        <div ref="leftElement" class="left-20 p-4 bg-[#B687FF] rounded-bl-3xl min-w-36 mb-10">
            <img src="/boecker/bo_element_left.png" alt="">
        </div>
        <div ref="leftElementText"class="flex flex-row gap-2 ">
            <div ref="line2" class="border-t w-20">

            </div>
            <span ref="textClp" class="text-base font-family-averRegular uppercase -mt-1">
                Sauerteig Aromen
            </span>

        </div>
    </div>
    <div ref="mainContent" class="overflow-hidden col-span-5 col-start-2 flex flex-col justify-center items-center relative z-10 border-t-2 border-b-2 border-white">
        <div class="relative overflow-hidden "> 
            <img src="/boecker/bo_laptop_nn.png" alt="" class="relative z-20  h-auto w-[62vw] mx-auto object-contain max-h-[80vh] ">

            <img ref="website" src="/boecker/bo_website.jpg" class="w-[48.3vw] h-auto absolute left-1/2 top-20 -ml-2 transform -translate-x-1/2 z-10 border-t-2 border-b-2 border-white " alt=""> 
            
            <div ref="logo" class="w-[48.3vw]  absolute left-1/2 top-23 transform -translate-x-1/2 z-10  flex items-center justify-center"> 
                <img src="/boecker/bo_logo_n.png" class="object-contain" alt="">
            </div>

        </div>


    </div>
    <div class="cold-span-2 -ml-20 flex flex-col items-start justify-end  z-20 gap-4">
        <div ref="text" class="text w-full text-base font-family-averRegular">
            <p>Die Ernst Böcker GmbH ist ein traditionsreiches Familienunternehmen und international anerkannter Spezialist Sauerteig-Produkte und Fermentations-lösungen. Seit Generationen steht Böcker für höchste Qualität, handwerkliche Kompetenz und Innovationskraft.</p>
            <p>Wir sind <span class="font-family-averBold">ganzheitlicher Marketing-partner</span> von BÖCKER. Vom <span class="font-family-averBold">strategischen Brand-Design</span> über eine moderne Webseite und einen leistungsstarken Online-Shop bis hin zu wirkungsvoller Social-Media-Kommunikation sorgen wir für einen konsistenten und starken Markenauftritt.</p>

                        
        </div>
        <div ref="line" class="border-l"></div>
        <div class="h-20 w-full flex flex-col gap-4">
            <span ref="textClp" class="text-base font-family-averRegular min-w-2 h-6">BÖCKER Social Media B2C und B2B</span>
            <div ref="line2" class="border-l h-10"></div>
        </div>
        <div ref="smallposterWrap" class="h-54 overflow-visible flex gap-10  relative w-full pt-4 ">
                                <img
                                    v-for="(src, idx) in [
                                        '/boecker/bo_socialmedia.png',
                                        '/boecker/bo_languages.png',
                                        '/boecker/bo_verpackung.png',
                                        '/boecker/bo_etiketten.png',
                                        '/boecker/bo_messe.png'
                                    ]"
                                    :key="src"
                                    :ref="smallposterRefs[idx]"
                                    class="absolute object-contain h-52 w-auto z-80"
                                    :src="src"
                                    alt=""
                                />
        </div> 

   
    </div>

         <img ref="graphics" src="/boecker/bo_graphics.png" alt="" class="absolute top-60 left-1/2 transform -translate-x-1/2  h-auto w-[46vw] z-0 ">
    </section>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ref, onMounted, onUnmounted } from "vue";

gsap.registerPlugin(ScrollTrigger, SplitText);

const panelBoecker= ref<HTMLElement | null>(null);
const mainContent= ref<HTMLElement | null>(null);
const website= ref<HTMLElement | null>(null);
const text= ref<HTMLElement | null>(null);
const line= ref<HTMLElement | null>(null);
const leftElement= ref<HTMLElement | null>(null);
const leftElementText= ref<HTMLElement | null>(null);
const textClp = ref<HTMLElement | null>(null);
const line2 = ref<HTMLElement | null>(null);
const graphics= ref<HTMLElement | null>(null);
const smallposterRefs = [
    ref<HTMLElement | null>(null),
    ref<HTMLElement | null>(null),
    ref<HTMLElement | null>(null),
    ref<HTMLElement | null>(null),
    ref<HTMLElement | null>(null)
];
const posterLabels = ['Social Media', 'Languages', 'Verpackung', 'Etiketten', 'Messeständer'];

const logo= ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;



onMounted(() => {

ctx = gsap.context(() => {
    const section = panelBoecker.value;
    const content = mainContent.value;
    const site = website.value;
    const textEl = text.value;
    const textLine = line.value;
    const leftEl = leftElement.value;
    const leftText = leftElementText.value;
    const textPosters = textClp.value;
    const linePosters = line2.value;
    const graphicsEl = graphics.value;
    const posters = smallposterRefs.map(ref => ref.value).filter(Boolean);
    const logoEl = logo.value;

    if (!section || !content || !site) return;

    // Pin the section for 4 viewport heights
    const pinDuration = window.innerHeight * 4;
    const split = new SplitText(textEl, { type: "words" });

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

    tl.set(content, { height: 0, y: 400 });
    tl.set(site, { y: 0, opacity: 0 });
    tl.set(leftEl, { x: -100, opacity: 0 });
    tl.set(leftText, { y: 50, opacity: 0 });
    tl.set(textLine, { height: 0 });
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
        tl.fromTo(logoEl, { autoAlpha: 0 },  { autoAlpha: 1, duration: 0.5 }, 3);

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

