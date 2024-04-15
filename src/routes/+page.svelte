<script lang="ts">
	import Chart from '$lib/components/Chart.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import Table from '$lib/components/Table.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import ViewBar from '$lib/components/ViewBar.svelte';
	import type { DropdownOption, RetentionOption, ViewType } from '$lib/types';
	import { games, retentions, filter } from '../store/store';

	const initialValue = { value: 'undefined', name: 'All' };

	let gameDropdown: HTMLDivElement;
	let versionsDropdown: HTMLDivElement;
	let countryDropdown: HTMLDivElement;

	let menuOpen = false;
	let toggleVersion = false;
	let toggleCountry = false;

	let view: ViewType = 'table';

	let selectedGame: DropdownOption = initialValue;
	let selectedVersion: DropdownOption = initialValue;
	let selectedCountry: DropdownOption = initialValue;

	const gameOptions: DropdownOption[] = $games
		.sort((a, b) => a.name.localeCompare(b.name))
		.map((game) => {
			return {
				value: game.app_id,
				name: game.name,
				icon: game.icon
			};
		});

	let versionOptions: DropdownOption[] = [];
	let countryOptions: DropdownOption[] = [];

	$: $filter,
		(versionOptions = $retentions
			.filter((item) => ($filter.game ? item.app_id === $filter.game : true))
			.filter((item) => ($filter.country ? item.country === $filter.country : true))
			.sort((a, b) => parseFloat(b.app_ver) - parseFloat(a.app_ver))
			.reduce((curr, acc) => {
				const existingItem = curr.find((item) => item.version === acc.app_ver);

				if (existingItem) {
					existingItem.devices += acc.days[0];
				} else {
					curr.push({
						version: acc.app_ver,
						devices: acc.days[0]
					});
				}
				return curr;
			}, [] as RetentionOption[])
			.map((item) => {
				return {
					value: item.version,
					name: `${item.version} (${item.devices})`
				};
			}));

	$: $filter,
		(countryOptions = $retentions
			.filter((item) => ($filter.game ? item.app_id === $filter.game : true))
			.filter((item) => ($filter.version ? item.app_ver === $filter.version : true))
			.reduce((acc, curr) => {
				const existingItem = acc.find((item) => item?.country === curr.country);

				if (existingItem) {
					existingItem.devices += curr.days[0];
				} else {
					acc.push({
						country: curr.country,
						devices: curr.days[0]
					});
				}

				return acc;
			}, [] as RetentionOption[])
			.sort((a, b) => b.devices - a.devices)
			.map((item) => {
				return {
					value: item.country,
					trimmedName:
						item.country && item.country.length > 17
							? `${item.country.slice(0, 17)}... (${item.devices})`
							: '',
					name: `${item.country} (${item.devices})` || ''
				};
			}));
</script>

<main class="container">
	<div class="filter-container">
		<div class="filter-bar">
			<Dropdown
				bind:value={$filter.game}
				bind:selected={selectedGame}
				options={gameOptions}
				bind:dropdown={gameDropdown}
				bind:showOptions={menuOpen}>Game</Dropdown
			>
			<Dropdown
				bind:value={$filter.version}
				bind:selected={selectedVersion}
				options={versionOptions}
				bind:dropdown={versionsDropdown}
				bind:showOptions={toggleVersion}>Version</Dropdown
			>
			<Dropdown
				bind:value={$filter.country}
				bind:selected={selectedCountry}
				options={countryOptions}
				bind:dropdown={countryDropdown}
				bind:showOptions={toggleCountry}>Country</Dropdown
			>
		</div>
		<div class="filter-selected">
			{#if selectedGame.name}
				<Tag bind:selectedValue={selectedGame} bind:value={$filter.game}
					><span class="title">Game:</span> {selectedGame.name}</Tag
				>
			{/if}
			{#if selectedVersion.name}
				<Tag bind:selectedValue={selectedVersion} bind:value={$filter.version}>
					<span class="title">Version:</span>
					{selectedVersion.name}
				</Tag>
			{/if}
			{#if selectedCountry.name}
				<Tag bind:selectedValue={selectedCountry} bind:value={$filter.country}>
					<span class="title">Country:</span>
					{selectedCountry.name}
				</Tag>
			{/if}
		</div>
	</div>

	<ViewBar bind:view />

	{#if view === 'table'}
		<Table />
	{:else}
		<Chart />
	{/if}
</main>

<style>
	.title {
		font-weight: bold;
	}

	.container {
		padding: 0 20px;
		max-width: 1200px;
		width: 100%;
		margin: 0 auto;
	}

	.filter-selected {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.filter-bar {
		display: flex;
		flex-wrap: wrap;
		gap: 14px;
	}

	@media only screen and (max-width: 600px) {
		.filter-bar {
			flex-direction: column;
			flex: 1;
			margin-bottom: 20px;
		}
	}
</style>
