<template>
	<div class="mx-auto py-8 px-8 w-full">
		<SourceButton class="float-right mt-2" />

		<div class="prose prose-discord dark:prose-light mx-auto lg:max-w-2xl xl:max-w-4xl">
			<h1>
				{{ cls?.name }}
			</h1>
			<p>
				<span v-if="cls?.extends">
					extends
					<TypeLink v-if="typeof cls?.extends[0] === 'string'" :type="cls?.extends" />
					<Types v-for="type in cls?.extends" v-else :key="typeKey(type)" :names="type" />
				</span>
				<span v-if="cls?.implements">
					implements
					<TypeLink v-if="typeof cls?.implements[0] === 'string'" :type="cls?.implements" />
					<Types v-for="type in cls?.implements" v-else :key="typeKey(type)" :names="type" />
				</span>
			</p>

			<p v-if="cls?.description" v-html="description"></p>

			<div v-if="cls?.construct">
				<h2>Constructor</h2>
				<pre
					v-highlightjs
				><code class="javascript">new {{ docs?.global }}.{{ cls?.name }}(<span v-for="param in constructorParameters" :key="param.name">{{ param.name }}</span>);</code></pre>
				<div class="overflow-auto">
					<ClassParameterTable :parameters="cls.construct.params" />
				</div>
			</div>

			<h2 v-if="properties && properties.length">Properties</h2>
			<ClassProperty v-for="property in properties" :key="scopedName(property)" :prop="property" />

			<h2 v-if="methods && methods.length">Methods</h2>
			<ClassMethod v-for="method in methods" :key="scopedName(method)" :method="method" />

			<h2 v-if="cls?.events && cls?.events.length">Events</h2>
			<ClassEvent v-for="event in cls?.events" :key="`e-${event.name}`" :event="event" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '~/store';
import { markdown } from '~/util/markdown';
import { convertLinks } from '~/util/convertLinks';
import { typeKey } from '~/util/typeKey';
import { scopedName } from '~/util/scopedName';

import SourceButton from '~/components/SourceButton.vue';
import TypeLink from '~/components/TypeLink.vue';
import Types from '~/components/Types.vue';
import ClassParameterTable from '~/components/ClassParameterTable.vue';
import ClassProperty from '~/components/ClassProperty.vue';
import ClassMethod from '~/components/ClassMethod.vue';

const router = useRouter();
const route = useRoute();
const store = useStore();

const docs = computed(() => store.state.docs);

const cls = docs.value?.classes.find((cls) => cls.name === route.params.class);

// @ts-ignore
const description = computed(() => markdown(convertLinks(cls?.description, docs.value, router, route)));
const constructorParameters = computed(() => {
	if (!cls?.construct || !cls.construct.params) {
		return null;
	}
	return cls.construct.params.filter((param) => param.name.includes('.'));
});
const properties = computed(() => {
	if (!cls?.props) {
		return null;
	}
	return cls.props.sort((a, b) =>
		`${a.scope === 'static' ? 'ZZZ' : ''}${a.name}`.localeCompare(`${b.scope === 'static' ? 'ZZZ' : ''}${b.name}`),
	);
});
const methods = computed(() => {
	if (!cls?.methods) {
		return null;
	}
	return cls.methods.sort((a, b) =>
		`${a.scope === 'static' ? 'ZZZ' : ''}${a.name}`.localeCompare(`${b.scope === 'static' ? 'ZZZ' : ''}${b.name}`),
	);
});

onMounted(() => {
	const element = document.getElementById(`doc-for-${route.query.scrollTo}`);
	element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
</script>
