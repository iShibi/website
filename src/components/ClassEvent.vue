<template>
	<div :id="`doc-for-e-${event.name}`">
		<SourceButton class="float-right mt-8" :meta="event.meta" />

		<h3 class="inline-block mr-2">
			<router-link :to="{ name: 'docs-source-tag-class-class', query: { scrollTo: `e-${event.name}` } }">{{
				event.name
			}}</router-link>
		</h3>
		<span
			v-if="event.deprecated"
			class="
				inline-flex
				items-center
				px-2.5
				py-1
				rounded-md
				text-sm
				font-medium
				bg-discord-red-500
				text-gray-200
				uppercase
			"
			>Deprecated</span
		>

		<div class="border-l-2 border-gray-300 p-4">
			<p v-html="description"></p>
			<div class="overflow-auto">
				<ClassParameterTable v-if="event.params && event.params.length" :parameters="event.params" />
			</div>
			<See v-if="event.see" :see="event.see" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { useStore } from '~/store';
import { convertLinks } from '~/util/convertLinks';
import { markdown } from '~/util/markdown';

const props = defineProps(['event']);

const router = useRouter();
const route = useRoute();
const store = useStore();

import SourceButton from '~/components/SourceButton.vue';
import ClassParameterTable from '~/components/ClassParameterTable.vue';
import See from '~/components/See.vue';

const docs = computed(() => store.state.docs);
// @ts-ignore
const description = computed(() => markdown(convertLinks(props.event.description, docs.value, router, route)));
</script>
