<script lang="ts">
	import { resolve } from '$app/paths';
	import { getPerson, getPersonDisplayName } from '$lib/content';
	import type { Event } from '$lib/content/types';

	type Props = {
		event: Event;
		authorSlug?: string | null;
		tags?: string[];
	};

	let { event, authorSlug, tags }: Props = $props();

	const author = $derived(authorSlug ? getPerson(authorSlug) : undefined);
	const authorDisplay = $derived(author ? getPersonDisplayName(author) : '');
</script>

<div class="meta">
	<p class="event-link">
		Made at <a href={resolve('/events/[slug]', { slug: event.slug })}>{event.title}</a>
		{#if author}
			<span>by</span>
			<a href={resolve('/people/[slug]', { slug: author.slug })}>{authorDisplay}</a>
		{/if}
	</p>
	{#if tags && tags.length}
		<p class="tags">
			{#each tags as tag (tag)}
				<span class="tag">{tag}</span>
			{/each}
		</p>
	{/if}
</div>

<style>
	.meta {
		font-family: var(--font-mono);
		font-size: 0.85rem;
		color: var(--color-ink);
		margin: var(--space-2) 0;
	}
	.tags {
		display: inline-flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		align-items: center;
	}
	.event-link {
		margin-top: var(--space-3);
		font-family: var(--font-mono);
		font-size: 0.9rem;
	}
</style>
