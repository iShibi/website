<template>
	<a :href="`${meta ? sourceURL(meta.path, meta.file, meta.line) : sourceURL(path)}`" target="_blank" rel="noopener">
		<heroicons-outline-code class="text-xl fill-current text-discord-blurple-530 hover:text-discord-blurple-500" />
	</a>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

import { useStore } from '~/store';

const store = useStore();

const props = defineProps(['meta', 'path']);

const docs = computed(() => store.state.docs);

const sourceURL = (path: string, file?: string, line?: string) => {
	return new URL(
		`${docs.value?.tag}/${path}${file ? `/${file}` : ''}${line ? `#L${line}` : ''}`,
		// @ts-ignore
		docs.value?.source,
	);
};
</script>
