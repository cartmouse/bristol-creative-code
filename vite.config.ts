import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

function getBasePath(): `/${string}` | undefined {
	const envBase = process.env.BASE_PATH;

	if (!envBase) return undefined;

	if (envBase?.startsWith('/')) {
		return envBase as `/${string}`;
	}

	return `/${envBase}`;
}

export default defineConfig({
	plugins: [
		sveltekit({
			paths: {
				base: getBasePath()
			},
			compilerOptions: {
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			adapter: adapter(),
			preprocess: [mdsvex({ extensions: ['.svx', '.md'] })],
			extensions: ['.svelte', '.svx', '.md']
		})
	]
});
