# Adding content

This folder holds every page on the Bristol Creative Code Jam site. To add a
new project, person, event, or hero sketch, add a file to the right subfolder
and open a pull request.

## Quick start

1. Add a file under `events/`, `people/`, `projects/`, or `sketches/`. The
   filename (minus extension) becomes the URL slug — keep it short and
   lowercase, e.g. `2025-07-12-summer-jam.md`, `cartmouse.md`,
   `flow-field.md`. For people, the URL is `/people/{filename}`.
2. Fill in the required shape for the type you want:
   - **Markdown files** (events, people, projects) use a YAML frontmatter
     block at the top. Leave `author` out of a project to post anonymously.
   - **Sketch files** are `.js` files that export a default p5 instance-mode
     function, plus an optional `meta` object with `title` and `author` (see
     below).
3. Push and open a PR. GitHub Actions will run a build. If your frontmatter
   or sketch shape is invalid, the build will fail with a clear error pointing
   at the bad field. A maintainer will review the content side and merge.

## Frontmatter (Markdown files)

See the in-app guide at `/submit` for live examples. The canonical fields are:

**Event** — `title`, `date` (YYYY-MM-DD), optional `rsvp` (URL). Event files
are pure data — there's no body, and recurring details (location, schedule)
live on the about page instead of per-event.

**Person** — optional `name` (omit to be known only by slug), optional
`pronouns`, `avatar` (URL), `links` (array of `{ label, url }`), `roles`
(array of strings, e.g. `[organiser]`), `displayHandle` (boolean — set to
`true` to show `@slug` in place of `name` everywhere on the site; falls back
to `@slug` automatically if `name` is missing). The slug is the filename.

**Project** — `title`, `event` (slug of an event file — required), `author`
(**slug of a person file** — omit to post anonymously), `tags` (array of
strings), `image` (URL), `links` (array of `{ label, url }`). The project's
date is taken from its event — there's no `date` field on a project.

## Sketches (`.js` files)

The hero on the home page shows a random p5.js sketch from the community. A
sketch is a single `.js` file that exports a default function in p5's
instance-mode shape, plus an optional `meta` object for attribution:

```js
export const meta = {
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
}
```

`title` is shown above the hero. If `meta.author` matches a person file,
their profile is linked. Omit `author` to post anonymously. Prefix all p5
calls with `p.`.

## What if a field is wrong?

The site is built at deploy time. A typo in `author` means the project
renders unlinked, not as an error — this is intentional, so contributors
don't get blocked by typos.

What _does_ fail the build: a missing or wrong `event` (the project has no
date without it), missing required fields, bad date format, non-URL strings
in URL fields, non-array `links`, malformed sketches (missing default
export, or default isn't a function), and so on. The error message names
the file and the field, so it's easy to fix.
