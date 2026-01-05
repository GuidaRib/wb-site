<template>
  <section ref="sectionEl" id="panel4" class="relative flex items-center justify-center min-h-screen overflow-hidden">
  <!-- Video background from public/video.mp4 -->
  <video ref="videoEl" class="absolute inset-0 w-full h-full object-cover z-0" :src="videoSrc" muted playsinline preload="auto"></video>

    <!-- Optional dim overlay to improve contrast -->
    <div class="absolute inset-0 bg-black/30 z-10"></div>

    <!-- Two decorative divs that will move up while this section is pinned -->
    <div class="decor-wrap pointer-events-none absolute inset-0 z-20">
      <div class="decor decor-a absolute rounded-lg bg-black w-1/2 h-auto left-[25%] top-[60%] opacity-0 p-5">
        <h1 class="text-[8rem] text-white text-center"> Hello Video</h1>
      </div>
      <div class="decor decor-b absolute rounded-lg bg-indigo-400 w-[220px] h-[120px] left-[65%] top-[90%] opacity-0 flex items-center justify-center text-white">
        <pre class="m-0 select-none">:-)</pre>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionEl = ref<HTMLElement | null>(null);
const videoEl = ref<HTMLVideoElement | null>(null);
const videoSrc = "video_kf_0.5s.mp4";

function once(el: EventTarget | null, event: string, fn: EventListenerOrEventListenerObject, opts?: AddEventListenerOptions) {
  if (!el) return () => {};
  const onceFn = function (this: any, e: Event) {
    el.removeEventListener(event, onceFn as EventListener);
    if (typeof fn === 'function') fn.apply(this, arguments as any);
  };
  el.addEventListener(event, onceFn as EventListener, opts);
  return onceFn;
}

onMounted(() => {
  const section = sectionEl.value;
  const video = videoEl.value;
  if (!section || !video) return;

  // basic setup
  video.muted = true;
  video.playsInline = true;
  video.setAttribute('aria-hidden', 'true');
  video.setAttribute('tabindex', '-1');
  video.style.pointerEvents = 'none';

  const scrollLength = window.innerHeight * 3;

  // iOS activation helper
  once(document.documentElement, 'touchstart', () => {
    video.play();
    video.pause();
  });

  // Create GSAP context so we can revert on unmount
  const ctx = gsap.context(() => {
    // Build the scrubbed timeline only after the video's metadata is available.
    once(video, 'loadedmetadata', () => {
      const dur = video.duration || 1;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${scrollLength}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
        },
      });

      const q = gsap.utils.selector(section);
      const decorA = q('.decor-a');
      const decorB = q('.decor-b');

      // ensure starting visual state (in case CSS differs)
      gsap.set([decorA, decorB], { opacity: 0 });

      // Add video scrub and decorative tweens into the same timeline at the same start time
      tl.fromTo(video, { currentTime: 0 }, { currentTime: dur, ease: 'none' }, 0);
      if (decorA) tl.fromTo(decorA, { y: 200, opacity: 0, scale: 0.95 }, { y: -220, opacity: 1, scale: 1, ease: 'none' }, 0);
      if (decorB) tl.fromTo(decorB, { y: 200, opacity: 0, scale: 0.95 }, { y: -320, opacity: 1, scale: 1, ease: 'none' }, 0);
    });
  }, section);

  


  // Optional: fetch blob to improve seekability in some browsers
  setTimeout(() => {
    if (typeof window.fetch === 'function') {
      const src = video.currentSrc || (video as HTMLVideoElement).src;
      fetch(src)
        .then((r) => r.blob())
        .then((blob) => {
          const blobURL = URL.createObjectURL(blob);
          const t = video.currentTime;
          once(document.documentElement, 'touchstart', () => {
            video.play();
            video.pause();
          });
          video.src = blobURL;
          // tiny seek nudges sometimes help
          try { video.currentTime = Math.min(video.duration || t + 0.01, t + 0.01); } catch (e) {}
        })
        .catch(() => {});
    }
  }, 500);

  onUnmounted(() => {
    ctx.revert();
  });
});
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
