import { env } from '$env/dynamic/private';

const base = env.BASE_PATH ?? '';

export default {
	paths: {
		base
	}
};
