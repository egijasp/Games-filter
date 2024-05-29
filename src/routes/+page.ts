import { games, retentions } from '../store/store';
import type { PageLoad } from './$types';

const gamesApi = 'https://storage.googleapis.com/estoty-temp/games.json';
const retentionApi = 'https://storage.googleapis.com/estoty-temp/retention.json';

export const load: PageLoad = async ({ fetch }) => {
	const gamesResponse = await fetch(gamesApi);

	const retentionsResponse = await fetch(retentionApi);

	if (!gamesResponse.ok || !retentionsResponse.ok) {
		throw new Error('Failed to fetch data');
	}

	games.set(await gamesResponse.json());
	retentions.set(await retentionsResponse.json());
};
