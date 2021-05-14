<template>
	<div class="docs-type whitespace-pre-wrap inline-block">
		<span class="font-semibold">{{ nullable ? '?' : '' }}{{ variable ? '...' : '' }}</span
		><TypeLink v-for="type in names" :key="typeKey(type)" :type="type" />
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

import { typeKey } from '~/util/typeKey';

import TypeLink from './TypeLink.vue';

const props = defineProps(['names', 'variable', 'nullable']);
</script>

<style>
.docs-type:not(:last-child)::after {
	content: ' or ';
}
</style>
