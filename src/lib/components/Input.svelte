<script lang="ts">
	export let value = '';
</script>

<input type="search" placeholder="Search..." autocomplete="off" class="input" bind:value />

<style>
	.input {
		font-size: 14px;
		padding: 8px;
		outline: 0;
		border: 1px solid #ccc;
		border-radius: 5px;
		margin: 12px;
		background-color: #f9fafb;
		padding-inline-start: 40px;
	}

	@media only screen and (max-width: 600px) {
		.input {
			width: 90%;
		}
	}
</style>
