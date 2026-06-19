import { getOrganisers, getCommunity } from '$lib/content';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		organisers: getOrganisers(),
		community: getCommunity()
	};
};
