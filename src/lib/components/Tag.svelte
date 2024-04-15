<script lang="ts">
	import type { DropdownOption } from '$lib/types';

	export let selectedValue: DropdownOption;
	export let value: string | undefined;

	const clickHandler = () => {
		selectedValue = {
			value: '',
			name: ''
		};

		value = '';
	};
</script>

<div class="tag">
	<slot />
	<button class="btn" on:click={clickHandler}>
		<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
			><path
				d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
			/></svg
		>
	</button>
</div>

<style>
	.tag {
		background: #f1f1f1;
		color: #333;
		border-radius: 7px;
		display: flex;
		justify-content: space-between;
		padding: 6px 12px;
		gap: 8px;
	}

	.tag svg {
		width: 16px;
		height: auto;
		fill: #808080;
	}

	.btn {
		border: none;
		cursor: pointer;
		display: flex;
		background-color: #f1f1f1;
	}

	@media only screen and (min-width: 600px) {
		.tag {
			margin-top: 20px;
		}
	}
</style>
