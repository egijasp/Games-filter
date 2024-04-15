<script lang="ts">
	import type { DropdownOption } from '$lib/types';
	import Input from './Input.svelte';

	export let selected: DropdownOption;

	export let showOptions: boolean = false;
	export let dropdown: HTMLDivElement;
	export let value: string | undefined;

	export let options: DropdownOption[];

	let showLabel = false;

	let filteredItems = options;

	let searchString: string = '';

	const onWindowClick = (e: MouseEvent) => {
		if (dropdown.contains(e.target as HTMLElement) == false) showOptions = false;
	};

	$: options, (options = [{ value: undefined, name: 'All' }, ...options]);

	const selectOption = (option: DropdownOption) => {
		value = option.value;
		selected = option;
		showOptions = false;
		searchString = '';
	};

	$: searchString,
		(filteredItems = options.filter(({ name }) =>
			name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
		));
</script>

<svelte:window on:click={onWindowClick} />

<div class="relative" bind:this={dropdown}>
	<button class="btn dropdown" on:click={() => (showOptions = true)}>
		<slot />
		<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
			><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" /></svg
		>
	</button>

	<div class="content" class:show={showOptions}>
		<div class="relative">
			<div class="search-icon">
				<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
					><path
						d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
					/></svg
				>
			</div>
			<Input bind:value={searchString} />
		</div>
		<ul class="options">
			{#if filteredItems.length > 0}
				{#each filteredItems as item, i (`${i}${item.value}`)}
					<li>
						<button
							on:click={() => selectOption(item)}
							class="btn option"
							on:mouseover={() => item.trimmedName && (showLabel = true)}
							on:mouseleave={() => (showLabel = false)}
							on:focus={() => item.trimmedName && (showLabel = true)}
						>
							{#if item.icon}
								<img src={item.icon} alt={item.name} class="img" />
							{/if}

							{#if showLabel && item.trimmedName}
								<span>{item.name}</span>
							{:else}
								{item.trimmedName || item.name}
							{/if}
						</button>
					</li>
				{/each}
			{:else}
				<li>No results found</li>
			{/if}
		</ul>
	</div>
</div>

<style>
	.relative {
		position: relative;
	}

	.btn {
		background-color: #fff;
		border: 1px solid gray;
		border-radius: 4px;
		cursor: pointer;
		font-size: 16px;
		padding: 6px 12px;
		display: flex;
		align-items: center;
	}

	.option:hover {
		background-color: #f1f1f1;
	}

	.dropdown {
		justify-content: space-between;
	}

	.dropdown:hover {
		background-color: #f1f1f1;
	}

	.option {
		padding: 10px 15px;
		border: none;
		width: 100%;
		text-align: left;
		font-size: 14px;
	}

	svg {
		width: 16px;
		height: auto;
		fill: #808080;
	}

	.btn svg {
		margin-left: 5px;
	}

	.content {
		display: none;
		position: absolute;
		border: 1px solid gray;
		border-radius: 7px;
		margin-top: 6px;
		z-index: 2;
		background-color: #fff;
	}

	.search-icon {
		position: absolute;
		display: flex;
		align-items: center;
		bottom: 0;
		top: 0;
		padding-inline-start: 12px;
		inset-inline-start: 12px;
	}

	.search-icon svg {
		vertical-align: middle;
	}

	.options {
		margin-top: 10px;
		max-height: 250px;
		overflow-y: auto;
		padding: 0 8px;
		list-style-type: none;
	}

	.options li {
		font-size: 21px;
		cursor: pointer;
	}

	.show {
		display: block;
	}

	.img {
		width: 30px;
		height: auto;
		margin-right: 10px;
	}

	@media only screen and (max-width: 600px) {
		.dropdown {
			width: 100%;
		}

		.content {
			width: 100%;
		}
	}
</style>
