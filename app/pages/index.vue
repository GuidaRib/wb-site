<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";

import Panel1 from "~/components/Homepage/Panel1.vue";
import Jazzahead from "~/components/Homepage/Jazzahead.vue";
import Footer from "~/components/Footer.vue";


gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText);

const main = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;
let smoother: ScrollSmoother | null = null;

const isMobile = () => window.matchMedia("(max-width: 1024px)").matches;

onMounted(() => {
  const mainEl = main.value;
  if (!mainEl) return;

  ctx = gsap.context(() => {
    // Normalize scroll input (helps across devices)
    if (ScrollTrigger.normalizeScroll) ScrollTrigger.normalizeScroll(true);

    // Only enable ScrollSmoother on desktop
    if (!isMobile()) {
      smoother = ScrollSmoother.create({
        wrapper: mainEl.parentElement || document.body,
        content: mainEl,
        smooth: 2,
        effects: true,
      });
    }

    // Example animation
    gsap.to(".box", {
      x: 400,
      rotate: 360,
      scrollTrigger: {
        trigger: ".box",
        start: "top center",
        scrub: true,
        toggleActions: "restart pause reverse pause",
      },
    });

    // Smooth anchor links
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = (link as HTMLAnchorElement).getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        if (smoother) {
          smoother.scrollTo(target, true, "power2.inOut");
        } else {
          gsap.to(window, {
            duration: 0.8,
            scrollTo: { y: target, autoKill: false },
            ease: "power2.inOut",
          });
        }

        // Optional: update hash after scroll
        history.pushState(null, "", href);
      });
    });

    // Refresh ScrollTrigger on resize (for mobile viewport changes)
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
  }, mainEl);
});

onUnmounted(() => {
  ctx?.revert();
  smoother?.kill?.();

});
</script>

<template>
  <main ref="main" class="!overflow-hidden">
    <Panel1 />
    <Jazzahead />


    <section
      id="panel5"
      class="flex flex-col gap-20 items-center min-h-screen justify-center bg-cover bg-center"
      :style="{ backgroundImage: 'url(/wm/gesamtes-bild.png)' }"
    >
      <h1 class="text-4xl">Section with vertical scroll</h1>
      <div class="box bg-purple-200 rounded-xl h-28 w-28"></div>
      
    </section>

    <Footer />
  </main>
</template>
