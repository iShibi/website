<template>
	<div :id="`doc-for-${scrollTo}`">
		<SourceButton class="float-right mt-8" :meta="method.meta" />

		<h3 class="inline-block mr-2">
			<router-link :to="{ name: 'docs-source-tag-class-class', query: { scrollTo } }">
				.{{ method.name }}(<span v-for="param in params" :key="param.name"
					>{{ param.variable ? '...' : '' }}{{ param.name }}</span
				>)
			</router-link>
		</h3>
		<span class="space-x-2 text-gray-200 text-sm font-semibold uppercase">
			<span
				v-if="method.scope === 'static'"
				class="inline-flex items-center px-2.5 py-1 rounded-md bg-discord-blurple-500"
				>Static</span
			>
			<span v-if="method.abstract" class="inline-flex items-center px-2.5 py-1 rounded-md bg-discord-blurple-500"
				>Abstract</span
			>
			<span v-if="method.deprecated" class="inline-flex items-center px-2.5 py-1 rounded-md bg-discord-red-500"
				>Deprecated</span
			>
			<span
				v-if="method.access === 'private'"
				class="inline-flex items-center px-2.5 py-1 rounded-md bg-discord-red-500"
				>Private</span
			>
		</span>

		<div class="border-l-2 border-gray-300 p-4">
			<p class="noprose" v-html="description"></p>
			<div class="overflow-auto">
				<ClassParameterTable v-if="method.params" :parameters="method.params" />
			</div>
			<div class="font-semibold">
				Returns:
				<span v-if="method.returns">
					<Types
						v-for="rtrn in method.returns.types || method.returns"
						:key="typeKey(rtrn)"
						:names="rtrn"
						:variable="method.returns.variable"
						:nullable="method.returns.nullable"
					/>
				</span>
				<TypeLink v-else :type="['void']" />
				<p v-if="method.returns && method.returns.description" class="noprose" v-html="returnDescription"></p>
			</div>

			<div v-if="method.throws" class="font-semibold">
				Throws:
				<Types v-for="thrw in method.throws" :key="thrw" :names="thrw" />
			</div>

			<div v-if="emits" class="font-semibold">
				Emits:
				<ul v-if="emits.length > 1">
					<li v-for="event in emits" :key="event.text">
						<router-link :to="event.link">{{ event.text }}</router-link>
					</li>
				</ul>
				<router-link v-else :to="emits[0].link">{{ emits[0].text }}</router-link>
			</div>

			<p v-if="method.examples" class="font-semibold">
				Examples:
				<Codeblock v-for="example in method.examples" :key="example" :code="example" />
			</p>

			<See v-if="method.see" :see="method.see" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { useStore } from '~/store';
import { parseLink } from '~/util/parseLink';
import { convertLinks } from '~/util/convertLinks';
import { markdown } from '~/util/markdown';
import { typeKey } from '~/util/typeKey';

const props = defineProps(['method']);

const router = useRouter();
const route = useRoute();
const store = useStore();

import SourceButton from '~/components/SourceButton.vue';
import ClassParameterTable from '~/components/ClassParameterTable.vue';
import TypeLink from '~/components/TypeLink.vue';
import Types from '~/components/Types.vue';
import Codeblock from '~/components/Codeblock.vue';
import See from '~/components/See.vue';

const docs = computed(() => store.state.docs);
// @ts-ignore
const description = computed(() => markdown(convertLinks(props.method.description, docs.value, router, route)));
const returnDescription = computed(() =>
	// @ts-ignore
	markdown(convertLinks(props.method.returns.description, docs.value, router, route)),
);
const params = computed(() =>
	// @ts-ignore
	props.method.params ? props.method.params.filter((p) => !p.name.includes('.')) : null,
);
const emits = computed(() =>
	// @ts-ignore
	props.method.emits ? props.method.emits.map((e) => parseLink(e.replace(/:event/i, ''), docs.value)) : null,
);
const scrollTo = computed(() => `${props.method.scope === 'static' ? 's-' : ''}${props.method.name}`);
</script>
