import type { Filter, Game, Retention } from '$lib/types';
import { derived, writable } from 'svelte/store';

export const games = writable<Game[]>([]);
export const retentions = writable<Retention[]>([]);

export const filter = writable<Filter>({ game: '', version: '', country: '' });

export const filteredRetentions = derived([retentions, filter], ([$retentions, $filter]) => {
	const { game, version, country } = $filter;
	return $retentions
		.filter((retention) => !game || retention.app_id === game)
		.filter((retention) => !version || retention.app_ver === version)
		.filter((retention) => !country || retention.country === country)
		.sort((a, b) => parseFloat(b.app_ver) - parseFloat(a.app_ver));
});
