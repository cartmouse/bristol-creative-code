<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Projects — Bristol Creative Code Jam</title>
</svelte:head>

<div class="container">
	<header class="section-head no-border">
		<h2>Projects</h2>
		<span class="muted count">Things made at jams.</span>
	</header>

	{#if data.projects.length}
		<div class="grid">
			{#each data.projects as project (project.slug)}
				<ProjectCard {project} />
			{/each}
		</div>
	{:else}
		<p class="muted">No projects yet — be the first to <a href="/submit">add one</a>.</p>
	{/if}
</div>

<style>
	.count {
		font-family: var(--font-mono);
		font-size: 0.85rem;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: var(--space-4);
	}
</style>
