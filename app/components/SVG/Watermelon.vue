<template>
    <div>
    <div ref="sectionEl"  class="md:h-screen w-full bg-black relative overflow-hidden">
      <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 2219 1537" style="enable-background:new 0 0 2219 1537;" xml:space="preserve">
          <defs>
            <mask id="melancia-mask">
               <path class="st1"  d="M458.9,390.2c0,0,67.9-18.2,67.9-18.2s-3.3,16.6,16.6,9.1c19.5-18.1,91.4-40.6,106-45.5
          c7.2,1.9,67.3-8.3,76.2-9.9c28.9,10.2,52.9,14.3,91.1,14.9c19.9-3.3,49.7-21.5,49.7-21.5s28.1,6.6,31.5,0c9.1-23.6,5-24.8,28.2-23.2
          c52.8,5,51.3-23,86.9-15.7c3.3,2.5,18.2-7.4,18.2-7.4c8.2,1.2,24.5-2.2,32.3-5c4.6-3.3,13.1-13.7,19.9-10.8c4.5,1.3,17.7-7.5,20.7-5
          c20.5-5.5,42.6-18.2,64.6-16.6c-7.6,10.3,8.8,10.8,12.4,12.4c5.2,0.1,28.4-12.2,27.3-20.7c12.5,1.3,24.1-0.3,33.1-9.9
          c5.6-2.1,19.1,5.4,24,7.5c0,0,19,2.5,19,2.5c9.1-1.8,55-2.9,57.1-16.6c19.1,6.4,27.2,11.4,46.4,0c14.8-1.3,56.1,2.6,71.2,3.3
          c7.1,1,27.3-6.4,33.5,2.1c11.6,1.8,39.2-3.8,48.8,11.6c6.2,7,6.3,0.3,5.8-4.1c4.3,0,11.3,16.7,10.8,19.5
          c-1.8,11.8,33.3-10.2,30.2-9.1c0,0,40.6-2.1,43.1-3.3c7.4-6.5,14.4,1.2,20.7,3.7c0,0,34.4,12,42.6,14.9c8.3,2.9,23.2,14.9,23.2,14.9
          c5.5,1,33,12.5,27.7-3.7c0,0,39.7,75.3,39.7,75.3s24.8,15.7,25.7,21.5c47.1,187.6-146.5,413.8-284.8,479.3
          c-325.7,178.4-795,166-1042.8-142.1c-19.3-30.9-38.6-78.9-38.6-78.9C451.3,626.2,467.3,424.6,458.9,390.2z"/>
               <path class="st1" id="melancia1" d="M1395.2,613.7L632,829.6l0,0c259.2,171.2,625.4,153.9,894,6.8c50.9-24.1,109.3-69.9,160.4-127.6L1395.2,613.7z"/>
            </mask>
           </defs>
          <!-- Image masked by the shape -->
          <image
            href="/melancia.png"
            width="2219"
            height="1537"
            mask="url(#melancia-mask)"
            preserveAspectRatio="xMidYMid slice"
          />
    </svg>
    <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 2219 1537" style="enable-background:new 0 0 2219 1537;" xml:space="preserve" class="absolute top-0 ">
      <polygon class="st1 hidden" id="melancia2" points="1686.4,708.5 1395.2,613.4 632,829.4 0.5,991 0.5,1536.2 1749.2,1536.8 2218.5,1255.9 2218.5,900.3 "/>
      <rect id="melancia3" x="0.5" y="0.5"  width="2218" height="1536" class="hidden"/>
    </svg> 
  
    </div>
  </div>

</template>

<script lang="ts" setup>

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'


gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)

const sectionEl = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null
let tl: gsap.core.Timeline | null = null

// wait for images inside the section to load (helps avoid layout shifts)
const waitForImages = (container: HTMLElement) => {
  const imgs = Array.from(container.querySelectorAll('img')) as HTMLImageElement[]
  const pending = imgs.filter((i) => !i.complete)
  if (!pending.length) return Promise.resolve()
  return Promise.all(pending.map((i) => new Promise((res) => i.addEventListener('load', res, { once: true }))))
}

async function initTimeline() {
  // cleanup any existing context/timeline first
  try { tl?.kill(); } catch (e) {}
  try { ctx?.revert(); } catch (e) {}

  await nextTick()
  // small delay to allow browser to stabilize layout after client navigation
  await new Promise((r) => setTimeout(r, 40))

  const section = sectionEl.value
  if (!section) return

  try { await waitForImages(section) } catch (e) {}

  ctx = gsap.context(() => {
    const firstPath = section.querySelector('#melancia1') as SVGPathElement | null
    const secondPath = section.querySelector('#melancia2') as SVGPathElement | null
    if (!firstPath || !secondPath) return

    tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => "+=" + section.offsetHeight * 2, 
        pin: true,
      }
    })

    tl.to(firstPath, { morphSVG: { shape: '#melancia2', type: 'linear', map: "position", } })
    .to(firstPath, { morphSVG: { shape: '#melancia3', type: 'rotational' } })

    // ensure ScrollTrigger recalculates now that timeline exists
    try { ScrollTrigger.refresh() } catch (e) {}
  }, section)
}

onMounted(() => {
  // initialize when the page mounts
  initTimeline()
})

// Recreate timeline when navigating to this route via client-side nav
const route = useRoute()
watch(() => route.fullPath, () => {
  // small timeout so incoming component has time to mount
  setTimeout(() => initTimeline(), 60)
})

onUnmounted(() => {
  try { tl?.kill(); } catch (e) {}
  try { ctx?.revert(); } catch (e) {}
  try { ScrollTrigger.getAll().forEach((t) => t.kill()) } catch (e) {}
}) 
</script>


<style type="text/css">
	.st0{stroke:#FFFFFF;stroke-miterlimit:10;}
	.st1{fill:#FFFFFF;}
</style>