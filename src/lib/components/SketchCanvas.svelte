<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getSketches, type Sketch } from '$lib/content';
	import type P5 from 'p5';

	let { sketch = $bindable() }: { sketch: Sketch | undefined } = $props();

	let container: HTMLDivElement | undefined = $state();
	let instance: P5 | undefined;
	let currentIdx = -1;

	const sketches = getSketches();

	function pickRandom(): number {
		if (sketches.length === 0) return -1;
		return Math.floor(Math.random() * sketches.length);
	}

	async function setSketch(idx: number) {
		if (!container || idx < 0 || idx >= sketches.length) return;
		if (idx === currentIdx) return;
		instance?.remove();
		currentIdx = idx;
		sketch = sketches[idx];
		const { default: P5Ctor } = await import('p5');
		instance = new P5Ctor(sketch.sketch, container);
	}

	onMount(() => setSketch(pickRandom()));
	onDestroy(() => instance?.remove());
</script>

<div bind:this={container} class="sketch-host" aria-hidden="true"></div>

<style>
	.sketch-host {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>
