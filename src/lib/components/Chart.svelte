<script lang="ts">
	import Chart from 'chart.js/auto';
	import { filteredRetentions, filter } from '../../store/store';

	let ctx: HTMLCanvasElement | undefined;

	const xLabels = [0, 5, 10, 20, 25, 30, 60, 90];

	let chart: Chart;

	let datasets: { version: string; days: number[] }[] = [];

	$: $filter,
		(datasets = $filteredRetentions
			.reduce<
				{
					version: string;
					days: number[];
				}[]
			>(
				(acc, curr) => {
					const exist = acc.find((item) => item.version === curr.app_ver);

					if (exist) {
						xLabels.forEach((day, i) => {
							exist.days[i] += curr.days[day];
						});
					} else {
						acc.push({
							version: curr.app_ver,
							days: xLabels.map((day) => curr.days[day])
						});
					}

					return acc;
				},
				[] as { version: string; days: number[] }[]
			)
			.map(({ version, days }) => {
				return {
					version,
					days: days.map((day) => Math.round((day / days[0]) * 100))
				};
			})
			.sort((a, b) => parseFloat(a.version) - parseFloat(b.version)));

	$: if (ctx) {
		if (chart) {
			chart.destroy();
		}
		chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: xLabels.map((day) => `D${day}`),
				datasets: datasets.map(({ version, days }) => {
					return {
						label: version,
						data: days
					};
				})
			},
			options: {
				plugins: {
					legend: {
						labels: {
							boxWidth: 10,
							boxHeight: 10,
							font: {
								size: 14
							}
						},
						title: {
							display: true,
							text: 'Series',

							font: {
								size: 16
							}
						}
					}
				},
				scales: {
					y: {
						beginAtZero: true,
						title: {
							display: true,
							text: 'Retention %'
						}
					},
					x: {
						title: {
							display: true,
							text: 'Days'
						}
					}
				}
			}
		});
	}
</script>

<main>
	<canvas bind:this={ctx} />
</main>

<style>
	canvas {
		max-height: 500px;
		height: 100%;
	}
</style>
