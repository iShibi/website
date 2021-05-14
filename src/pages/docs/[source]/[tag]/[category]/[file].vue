<template>
	<div class="prose prose-discord dark:prose-light mx-auto py-8 px-8 w-full md:max-w-4xl lg:max-w-3xl xl:max-w-4xl">
		<SourceButton class="float-right mt-2" :path="file?.path" />
		<div v-html="html"></div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '~/store';
import { markdown } from '~/util/markdown';

import SourceButton from '~/components/SourceButton.vue';

const route = useRoute();
const store = useStore();

const docs = computed(() => store.state.docs);
const file = computed(() => store.state.file);

if (route.params.category && route.params.file) {
	store.commit({
		type: 'setFile',
		// @ts-ignore
		file: docs.value?.custom[route.params.category].files[route.params.file],
	});
}

const html = computed(() => {
	if (!file.value) return;
	let content: string;
	if (file.value.type === 'md') {
		content = file.value.content;
	} else {
		content = `# ${file.value.name}\n\`\`\`${file.value.type}\n${file.value.content}\n\`\`\``;
	}
	return markdown(content);
});
</script>
