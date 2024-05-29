<script>
	import { page } from '$app/stores';
</script>

<div class="container">
	<h1 class="status">{$page.status || ''}</h1>
	<p class="message">{$page.error?.message}</p>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		width: 100%;
		padding: 16px;
	}

	.status {
		font-size: 32px;
		margin: 0;
	}

	.message {
		font-size: 24px;
	}
</style>
