<script lang="ts">
	const eventExample = `---
title: August 25
date: 2025-08-12
rsvp: https://example.com/rsvp
---`;

	const personExample = `---
name: Ada Lovelace
links:
  - label: Website
    url: https://example.com
pronouns: she/her
---

I've been making generative art for about three years and love p5.js. Outside of code I do ceramics.`;

	const attributedProjectExample = `---
title: p5.js Experiments  
event: august-25 
author: ada
tags: [p5.js, generative art]
links:
  - label: Live demo
    url: https://example.com/art
image: https://example.com/cover.png
---

A series of sketches exploring different particle behaviours.`;

	const anonymousProjectExample = `---
title: WebGL Test 
event: august-25 
tags: [webgl]
---

A WebGL experiment. Posting anonymously because I don't want my name on this one yet.`;

	const sketchExample = `export const meta = {
  title: 'My cool sketch',
  author: 'your-slug' // optional, links to /people/your-slug
};

export default function sketch(p) {
  p.setup = () => {
    p.createCanvas(400, 400);
    p.background(255);
  };

  p.draw = () => {
    p.fill(0);
    p.circle(p.random(400), p.random(400), 20);
  };
}`;
</script>

<svelte:head>
	<title>Submit content — Bristol Creative Code Jam</title>
</svelte:head>

<article class="container narrow">
	<header class="page-head">
		<h1>Submit content</h1>
	</header>

	<div class="prose">
		<p>
			This site is built from Markdown files in a Git repository. To add a new project, person, or
			event, fork the repo, add a file, and open a pull request.
		</p>

		<h2>1. Fork the repo</h2>
		<p>
			Use the <strong>Fork</strong> button on GitHub to make your own copy. Clone it, create a
			branch (e.g. <code>add-my-project</code>), and you're ready to edit.
		</p>

		<h2>2. Add a file</h2>
		<p>Pick the right folder based on what you're adding:</p>
		<ul>
			<li><code>src/content/events/</code> - a new jam date</li>
			<li><code>src/content/people/</code> - your bio (the filename is your URL slug)</li>
			<li><code>src/content/projects/</code> - something you made</li>
			<li><code>src/content/sketches/</code> - a p5.js sketch for the home page hero</li>
		</ul>
		<p>
			The filename becomes the URL slug so it needs to be short and URL-friendly. Examples:
			<code>2025-07-12-summer-jam.md</code>, <code>ada.md</code>, <code>webgl-experiment.md</code>
		</p>

		<h2>3. Fill in the frontmatter</h2>
		<p>
			Markdown files (events, people, projects) start with a block of YAML between <code>---</code>
			markers. Sketches are <code>.js</code> files with a different shape — see below.
		</p>

		<h3>Event</h3>
		<pre><code>{eventExample}</code></pre>

		<h3>Person</h3>
		<pre><code>{personExample}</code></pre>
		<p>
			The filename is your slug and your URL: <code>ada.md</code> becomes
			<code>/people/ada</code>. <code>name</code> is optional, omit it to be known only by your
			slug. Set <code>displayHandle: true</code> to show <code>@slug</code> in place of your name everywhere
			on the site (e.g. on project cards and bylines).
		</p>

		<h3>Project (attributed)</h3>
		<pre><code>{attributedProjectExample}</code></pre>

		<h3>Project (anonymous)</h3>
		<p>
			To post anonymously, just leave out the <code>author</code> field.
		</p>
		<pre><code>{anonymousProjectExample}</code></pre>

		<h3>Sketch (.js file)</h3>
		<p>
			The hero on the home page shows a random p5.js sketch. A sketch is a single <code>.js</code>
			file that exports a default function (the p5 instance-mode sketch) plus an optional
			<code>meta</code>
			object with <code>title</code> and <code>author</code>. Prefix all p5 calls with
			<code>p.</code>:
		</p>
		<pre><code>{sketchExample}</code></pre>
		<p>
			<code>title</code> is shown ontop of the hero. If <code>author</code> matches a person file in
			<code>src/content/people/</code>, their profile is linked. Omit <code>author</code> to post anonymously.
		</p>

		<h2>4. Write the body</h2>
		<p>
			Below the frontmatter, write the body in Markdown. It's parsed with
			<a href="https://mdsvex.pngwn.io/">mdsvex</a> so you can embed images, videos and Svelte components.
		</p>

		<h2>5. Open a pull request</h2>
		<p>
			Push your branch and open a PR. GitHub Actions will run a build to make sure your frontmatter
			is valid. If something's off, the PR will show an error. A maintainer will review and merge
			when ready.
		</p>

		<p>Once your PR merges, the site rebuilds and your work is live.</p>

		<h2>Tips</h2>
		<ul>
			<li>
				Projects <strong>require</strong> an <code>event</code>. This must match the project slug
				(the filename minus <code>.md</code>) of a defined event or the build will fail
			</li>
			<li>Dates are <code>YYYY-MM-DD</code>.</li>
			<li>
				If you're unsure of anything, just reach out to one of the <a href="/people">organisers</a> who
				will be able to help!
			</li>
		</ul>
	</div>
</article>

<style>
	.narrow {
		max-width: var(--max-w);
	}
	.page-head {
		margin-bottom: var(--space-5);
		padding-bottom: var(--space-4);
		border-bottom: var(--border);
	}
	pre {
		white-space: pre-wrap;
	}
</style>
