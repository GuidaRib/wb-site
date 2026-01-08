<template>

<svg ref="svgElement" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 2401.3 1602.2" enable-background="new 0 0 2401.3 1602.2" xml:space="preserve">
<g id="Layer_1">

	<rect x="-3" y="0" display="none" fill="none" width="2433.2" height="1608.2"/>
	<path ref="pathElement" fill="#FFFFFF" stroke="#FFFFFF" d="M3,2v1605.2h2401.2V2H3z M841.3,838.3c-53,0-96-43-96-96s43-96,96-96s96,43,96,96S894.3,838.3,841.3,838.3z
		"/>
</g>

</svg>
</template>

<script setup lang="ts">
import { ref } from "vue";

const svgElement = ref<SVGElement | null>(null);
const pathElement = ref<SVGPathElement | null>(null);

// Function to generate path with specific radius
const generatePath = (radius: number) => {
  const cx = 841.3;
  const cy = 742.3;
  return `M3,2v1605.2h2401.2V2H3z M${cx},${cy + radius}c-${radius * 0.552},0-${radius}-${radius * 0.448}-${radius}-${radius}s${radius * 0.448}-${radius},${radius}-${radius}s${radius},${radius * 0.448},${radius},${radius}S${cx + radius * 0.552},${cy + radius},${cx},${cy + radius}z`;
};

// Expose method for parent to update the radius
const updateRadius = (radius: number) => {
  if (pathElement.value) {
    pathElement.value.setAttribute('d', generatePath(radius));
  }
};

defineExpose({
  updateRadius
});
</script>
