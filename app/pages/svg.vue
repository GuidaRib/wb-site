<template>
  <div class="bg-black">
    <div ref="sectionEl"  class="h-full bg-no-repeat bg-cover">
      <img src="/svgbackground.jpg" alt="Whitebox Logo" class="w-full h-auto"/>
      <shape1></shape1>
      <shape2></shape2>
    </div>
    <HomepageSliderReveal variant="h"></HomepageSliderReveal>
    <SVGWatermelon></SVGWatermelon>
      <Footer />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
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
    const firstPath = section.querySelector('#path1') as SVGPathElement | null
    const secondPath = section.querySelector('#path2') as SVGPathElement | null
    if (!firstPath || !secondPath) return

    tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'center center',
        scrub: true,
      }
    })

    tl.to(firstPath, { morphSVG: { shape: '#path2', type: 'linear' } })
      .to(secondPath, { morphSVG: { shape: '#path1', type: 'linear' } }, '<')

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
