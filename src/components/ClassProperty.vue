<template>
	<div :id="`doc-for-${scrollTo}`">
		<SourceButton class="float-right mt-8" :meta="prop.meta" />

		<h3 class="inline-block mr-2">
			<router-link :to="{ name: 'docs-source-tag-class-class', query: { scrollTo } }">.{{ prop.name }}</router-link>
		</h3>
		<span class="space-x-2 text-gray-200 text-sm font-semibold uppercase">
			<span
				v-if="prop.scope === 'static'"
				class="inline-flex items-center px-2.5 py-1 rounded-md bg-discord-blurple-500"
				>Static</span
			>
			<span v-if="prop.readonly" class="inline-flex items-center px-2.5 py-1 rounded-md bg-discord-blurple-500"
				>Read-only</span
			>
			<span v-if="prop.deprecated" class="inline-flex items-center px-2.5 py-1 rounded-md bg-discord-red-500"
				>Deprecated</span
			>
			<span v-if="prop.access === 'private'" class="inline-flex items-center px-2.5 py-1 rounded-md bg-discord-red-500"
				>Private</span
			>
		</span>

		<div class="border-l-2 border-gray-300 p-4">
			<p class="noprose" v-html="description"></p>
			<div class="overflow-auto">
				<ClassParameterTable v-if="prop.props && prop.props.length > 0" :parameters="prop.props" />
			</div>
			<div class="font-semibold">
				Type: <Types v-for="type in prop.type" :key="typeKey(type)" :names="type" :nullable="prop.nullable" />
			</div>
			<div v-if="prop.default">
				Default: <code>{{ prop.default }}</code>
			</div>
			<See v-if="prop.see" :see="prop.see" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { useStore } from '~/store';
import { convertLinks } from '~/util/convertLinks';
import { markdown } from '~/util/markdown';
import { typeKey } from '~/util/typeKey';

import SourceButton from '~/components/SourceButton.vue';
import ClassParameterTable from '~/components/ClassParameterTable.vue';
import Types from '~/components/Types.vue';
import See from '~/components/See.vue';

const props = defineProps(['prop']);

const router = useRouter();
const route = useRoute();
const store = useStore();

const docs = computed(() => store.state.docs);
// @ts-ignore
const description = computed(() => markdown(convertLinks(props.prop.description, docs.value, router, route)));
const scrollTo = computed(() => `${props.prop.scope === 'static' ? 's-' : ''}${props.prop.name}`);
</script>
