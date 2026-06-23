<script lang="ts">
	import { formatDate } from '$lib/utils/date';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { resolve } from '$app/paths';

	let { data } = $props();
	const event = $derived(data.event);
	const projects = $derived(data.projects);
</script>

<svelte:head>
	<title>{event.title} — Creative Code Bristol</title>
</svelte:head>

<div class="container">
	<header class="event-header">
		<p class="back">
			<a href={resolve('/events')}>← All events</a>
		</p>
		<h1>{event.title}</h1>
		<p class="date"><time datetime={event.date}>{formatDate(event.date)}</time></p>
	</header>

	{#if event.images && event.images.length}
		<header class="section-head">
			<h2>Gallery</h2>
		</header>
		<div class="gallery">
			<div class="grid">
				{#each event.images as image (image.src)}
					<figure class="tile">
						<img src={image.src} alt={image.alt} loading="lazy" />
					</figure>
				{/each}
			</div>
		</div>
	{/if}

	<header class="section-head">
		<h2>Projects from this jam</h2>
		<span class="muted count">{projects.length}</span>
	</header>
	{#if projects.length}
		<div class="grid">
			{#each projects as project (project.slug)}
				<ProjectCard {project} />
			{/each}
		</div>
	{:else}
		<p class="muted">
			No projects from this jam yet — be the first to <a href={resolve('/submit')}>add one</a>.
		</p>
	{/if}
</div>

<style>
	.section-head {
		margin-top: var(--space-4);
	}
	.date {
		font-family: var(--font-mono);
		font-size: 0.95rem;
		margin: var(--space-2) 0 0;
	}
	.count {
		font-family: var(--font-mono);
		font-size: 0.85rem;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: var(--space-4);
	}
	.gallery {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}
	.tile {
		margin: 0;
		background: var(--color-ink);
		overflow: hidden;
		border: var(--border);
	}
	.tile img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.tile {
		aspect-ratio: 4 / 3;
	}
</style>
