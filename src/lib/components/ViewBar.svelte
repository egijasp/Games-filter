<script lang="ts">
	import type { ViewType } from '$lib/types';

	export let view: ViewType;
</script>

<div class="view-bar">
	<button class:active={view === 'table'} class="btn" on:click={() => (view = 'table')}
		>Table</button
	>
	<button class="btn" class:active={view === 'chart'} on:click={() => (view = 'chart')}
		>Chart</button
	>
</div>

<style>
	.view-bar {
		margin-bottom: 20px;
		margin-top: 20px;
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.btn {
		background-color: #fff;
		border-radius: 4px;
		cursor: pointer;
		font-size: 16px;
		padding: 6px 24px;
		border: 1px solid #808080;
	}

	.btn:hover {
		background-color: #f2f2f2;
	}

	.btn.active {
		background: #494949;
		color: #fff;
	}
</style>
