<template>
	<div class="min-h-full grid grid-layout dark:bg-[#1f1f1f]">
		<Navbar />
		<div>
			<router-view />
		</div>
		<Footer />
	</div>
</template>

<script setup lang="ts">
import Navbar from '~/components/Navbar.vue';
</script>

<style>
.grid-layout {
	grid-template-rows: auto 1fr auto;
}
</style>
