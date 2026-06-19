<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import p5 from 'p5';
	import { getSketches, getPerson, getPersonDisplayName, type Sketch } from '$lib/content';

	let container: HTMLDivElement | undefined = $state();
	let instance: p5 | undefined;
	let currentIdx = -1;
	let sketch = $state<Sketch>();

	const sketches = getSketches();
	const author = $derived(sketch?.meta.author ? getPerson(sketch.meta.author) : undefined);
	const authorDisplay = $derived(author ? getPersonDisplayName(author) : '');

	function pickRandom(): number {
		if (sketches.length === 0) return -1;
		return Math.floor(Math.random() * sketches.length);
	}

	function pickDifferent(): number {
		if (sketches.length <= 1) return 0;
		let idx = pickRandom();
		while (idx === currentIdx) idx = pickRandom();
		return idx;
	}

	function setSketch(idx: number) {
		if (!container || idx < 0 || idx >= sketches.length) return;
		if (idx === currentIdx) return;
		instance?.remove();
		currentIdx = idx;
		sketch = sketches[idx];
		instance = new p5(sketch.sketch, container);
	}

	export function next() {
		setSketch(pickDifferent());
	}

	onMount(() => setSketch(pickRandom()));
	onDestroy(() => instance?.remove());
</script>

<div bind:this={container} class="sketch-host" aria-hidden="true">
	{#if sketch}
		<p class="info">
			<em>{sketch.meta.title}</em>
			{#if author}
				by <a href="/people/{author.slug}">{authorDisplay}</a>
			{:else if sketch.meta.author}
				by {sketch.meta.author}
			{/if}
		</p>
	{/if}
</div>

<style>
	.sketch-host {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.info {
		position: absolute;
		right: var(--space-3);
		top: var(--space-3);
		background: var(--color-paper);
		padding: var(--space-1);
		border: 1px solid var(--color-ink);
	}
</style>
