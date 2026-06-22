<script lang="ts">
	import { resolve } from '$app/paths';
	import { getPerson, getPersonDisplayName } from '$lib/content';
	import type { ProjectWithEvent } from '$lib/content/types';

	type Props = {
		project: ProjectWithEvent;
	};

	let { project }: Props = $props();

	const author = $derived(project.author ? getPerson(project.author) : undefined);
	const authorDisplay = $derived(author ? getPersonDisplayName(author) : '');
</script>

<article class="card">
	{#if project.image}
		<div class="thumb">
			<img src={project.image} alt="" loading="lazy" />
		</div>
	{/if}
	<div class="body">
		<h3>
			<a class="title-link" href={resolve('/projects/[slug]', { slug: project.slug })}
				>{project.title}</a
			>
		</h3>
		<div class="meta">
			<a class="event-link" href={resolve('/events/[slug]', { slug: project.event.slug })}
				>{project.event.title}</a
			>
			<span class="sep" aria-hidden="true">·</span>
			{#if author}
				<span>{authorDisplay}</span>
			{:else}
				<span class="muted">Anonymous</span>
			{/if}
		</div>
		{#if project.tags && project.tags.length}
			<div class="tags">
				{#each project.tags as tag (tag)}
					<span class="tag">{tag}</span>
				{/each}
			</div>
		{/if}
	</div>
</article>

<style>
	.card {
		position: relative;
		display: flex;
		flex-direction: column;
		background: var(--color-paper);
		border: var(--border);
		color: inherit;
		text-decoration: none;
	}

	.card:hover,
	.card:focus-visible {
		background: var(--color-ink);
		color: var(--color-paper);
		text-decoration: none;
	}

	.title-link::after {
		content: '';
		position: absolute;
		inset: 0;
	}

	.thumb {
		aspect-ratio: 16 / 9;
		background: var(--color-ink);
		overflow: hidden;
		border-bottom: var(--border);
	}

	.thumb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.body {
		padding: var(--space-4);
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.body h3 {
		margin: 0;
		font-family: var(--font-display);
		font-size: 0.95rem;
		text-transform: uppercase;
		letter-spacing: 0.02em;
	}

	.title-link {
		color: inherit;
		text-decoration: none;
	}

	.title-link:hover,
	.title-link:focus-visible {
		text-decoration: underline;
	}

	.meta {
		display: flex;
		gap: var(--space-2);
		font-family: var(--font-mono);
		font-size: 0.8rem;
	}

	.event-link {
		position: relative;
		z-index: 1;
		color: inherit;
		text-decoration: none;
	}

	.event-link:hover,
	.event-link:focus-visible {
		text-decoration: underline;
	}

	.sep {
		opacity: 0.4;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		margin-top: var(--space-1);
	}
</style>
