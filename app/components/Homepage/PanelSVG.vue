<template>
    <section ref="sectionEl" class="flex items-center bg-white min-h-screen justify-center relative bg-cover bg-center" style="background-image: url('/gesamtes-bild.png'); height: 100vh;">
        <svg width="100%" height="100%">
            <defs>
                <mask id="circle-mask" >
                    <rect width="100%" height="100%" fill="white" />
                    <circle class="circle-dot" cx="34.6%" cy="46%" r="7.6vw" fill="black" />
                </mask>
            </defs>
            <rect width="100%" height="100%" fill="currentColor" mask="url(#circle-mask)" />
        </svg>
        <div class="absolute right-20 flex items-center justify-center">
            <h1 class="text-[7rem] text-white">Whitebox</h1>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const sectionEl = ref<HTMLElement | null>(null)

onMounted(() => {
    const section = sectionEl.value;
    if (!section) return;

    const dot = section.querySelector('.circle-dot') as SVGCircleElement | null;
    if (!dot) return;

    // Compute the initial radius in pixels (handle vw or px values)
    const rawR = dot.getAttribute('r') || '';
    let initialR = 0;
    if (rawR.endsWith('vw')) {
        const v = parseFloat(rawR.slice(0, -2));
        initialR = window.innerWidth * (v / 100);
    } else if (rawR.endsWith('px')) {
        initialR = parseFloat(rawR.slice(0, -2));
    } else {
        initialR = parseFloat(rawR) || 0;
    }

    const targetR = window.innerWidth * 1.5;
    const minPx = () => window.innerWidth * 0.076; // 7.6vw

    // Set explicit starting pixel radius on the element so visuals match immediately
    dot.setAttribute('r', String(initialR));

    const proxy = { r: initialR };
    const tween = gsap.to(proxy, {
        r: targetR,
        ease: 'bounce.out(0.5)',
        onUpdate: () => {
            const clamped = Math.max(proxy.r, minPx());
            dot.setAttribute('r', String(clamped));
        },
        scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            markers: false,
            pin: true,

        },
    });

    onUnmounted(() => {
        try { if (tween && tween.scrollTrigger) tween.scrollTrigger.kill(); } catch (e) {}
        try { tween.kill(); } catch (e) {}
    });
});
</script>