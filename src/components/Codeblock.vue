<template>
	<div class="relative">
		<pre v-highlightjs="props.code"><code class="javascript"></code></pre>
		<button
			ref="copyButton"
			class="
				absolute
				right-0
				bottom-0
				mb-4
				mr-4
				inline-block
				text-gray-200
				cursor-pointer
				hover:text-white
				focus:outline-none
			"
		>
			<heroicons-outline-clipboard-copy
				v-if="!copied"
				class="fill-current text-gray-700 dark:text-gray-200"
				@click="copyCode"
			/>
			<heroicons-outline-clipboard-check
				v-else
				class="fill-current text-discord-green-600 dark:text-discord-green-500"
				@click="copyCode"
			/>
		</button>
	</div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { useTippy } from 'vue-tippy';
import debounce from 'lodash/debounce';

const props = defineProps({
	code: {
		type: String,
		required: true,
	},
});

const copyButton = ref();
const copied = ref(false);
const resetCopied = debounce((hide: () => void) => {
	hide();
	copied.value = false;
}, 1000);

const { show: showTooltip, hide: hideTooltip } = useTippy(copyButton, {
	theme: 'discord',
	content: 'Copied',
	trigger: 'manual',
	hideOnClick: false,
});

const copyCode = async () => {
	try {
		await navigator.clipboard.writeText(props.code);
		showTooltip();
	} catch {}

	copied.value = true;
	resetCopied(hideTooltip);
};
</script>
