<template>
	<ul>
		<li>{{ downloads }} downloads</li>
		<li>{{ stars }} stars</li>
		<li>{{ contributors }} contributors</li>
	</ul>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';

const toJSON = (res: Response) => res.json();
const noop = () => {};

const downloadNumber = ref(225_000_000);
const starNumber = ref(11_000);
const contributorNumber = ref(100);
const isFetching = ref(false);

const downloads = computed(() => `${downloadNumber.value.toLocaleString()}+`);
const stars = computed(() => `${starNumber.value.toLocaleString()}+`);
const contributors = computed(() => `${contributorNumber.value.toLocaleString()}+`);

const fetchStats = async () => {
	if (isFetching.value) return;
	isFetching.value = true;

	const [fetchedDownloads, fetchedStars, fetchedContributors] = await Promise.all([
		fetch('https://api.npmjs.org/downloads/range/2013-08-21:2100-08-21/discord.js').then(toJSON, noop),
		fetch('https://api.github.com/repos/discordjs/discord.js').then(toJSON, noop),
		fetch('https://api.github.com/repos/discordjs/discord.js/stats/contributors').then(toJSON, noop),
	]);

	if (fetchedDownloads) {
		downloadNumber.value = 0;
		for (const item of fetchedDownloads.downloads) {
			downloadNumber.value += item.downloads;
		}
	}
	if (fetchedStars) {
		starNumber.value = fetchedStars.stargazers_count;
	}
	if (fetchedContributors) {
		contributorNumber.value = fetchedContributors.length;
	}
};

onBeforeMount(async () => {
	await fetchStats();
});
</script>
