<script lang="ts">
	import { filteredRetentions, retentions } from '../../store/store';
</script>

<main>
	<div class="table-container">
		<table class="table">
			<thead>
				<tr class="table-header">
					<th class="sticky-col first-col">Version</th>
					<th class="sticky-col second-col">Country</th>
					{#each Array.from({ length: $retentions[0].days.length }, (_, i) => i) as day (`D${day}`)}
						<th>D{day}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each $filteredRetentions as { app_id, app_ver, country, days } (app_id + country + days)}
					<tr>
						<td class="sticky-col first-col">{app_ver}</td>
						<td class="sticky-col second-col"> {country}</td>
						{#each days as day, i (`${i}day`)}
							<td>{Math.round((day / days[0]) * 100)}%</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</main>

<style>
	.table-container {
		overflow: auto;
		max-height: 500px;
		position: relative;
		border: 1px solid #f2f2f2;
	}

	.table {
		font-size: 14px;
		border-spacing: 0;
	}

	.sticky-col {
		position: sticky;
		background-color: #f2f2f2;
	}

	.first-col {
		width: 60px;
		min-width: 60px;
		max-width: 60px;
		left: 0px;
	}

	.second-col {
		width: 100px;
		min-width: 100px;
		max-width: 100px;
		left: 60px;
	}

	.table-header {
		position: sticky;
		top: 0;
		z-index: 1;
	}

	th,
	td {
		padding: 8px;
		text-align: left;
		border-bottom: 1px solid #ddd;
	}

	th {
		background-color: #f2f2f2;
	}

	@media only screen and (min-width: 600px) {
		.first-col {
			width: 80px;
			min-width: 80px;
			max-width: 80px;
		}

		.second-col {
			width: 150px;
			min-width: 150px;
			max-width: 150px;
			left: 80px;
		}
	}
</style>
