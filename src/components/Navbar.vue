<template>
	<header class="bg-discord-blurple-560">
		<div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 lg:flex lg:justify-between">
			<nav class="hidden lg:py-2 lg:flex lg:space-x-8" aria-label="Global">
				<router-link
					to="/"
					class="
						text-gray-200
						hover:bg-discord-blurple-630
						hover:text-white
						rounded-md
						py-2
						px-3
						inline-flex
						items-center
						text-sm
						font-semibold
					"
					active-class="bg-discord-blurple-600"
				>
					discord.js
				</router-link>

				<router-link
					to="/docs"
					class="
						text-gray-200
						hover:bg-discord-blurple-630
						hover:text-white
						rounded-md
						py-2
						px-3
						inline-flex
						items-center
						text-sm
						font-semibold
					"
					active-class="bg-discord-blurple-600"
				>
					Documentation
				</router-link>

				<a
					:href="`https://github.com/${repository}`"
					class="
						text-gray-200
						hover:bg-discord-blurple-630
						hover:text-white
						rounded-md
						py-2
						px-3
						inline-flex
						items-center
						text-sm
						font-semibold
					"
					target="_blank"
					rel="noopener"
				>
					GitHub
				</a>

				<a
					href="https://discordjs.guide"
					class="
						text-gray-200
						hover:bg-discord-blurple-630
						hover:text-white
						rounded-md
						py-2
						px-3
						inline-flex
						items-center
						text-sm
						font-semibold
					"
					target="_blank"
					rel="noopener"
				>
					Guide
				</a>
			</nav>

			<div class="relative h-16 flex lg:max-w-lg lg:w-full">
				<div class="relative z-0 flex-1 px-2 flex items-center justify-center">
					<div class="w-full sm:max-w-xs">
						<label for="search" class="sr-only">Search</label>
						<div class="relative">
							<div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
								<heroicons-outline-search class="h-5 w-5 text-gray-200" />
							</div>
							<input
								id="search"
								name="search"
								class="
									block
									w-full
									bg-discord-blurple-630
									border border-transparent
									rounded-md
									py-2
									pl-10
									pr-3
									text-sm
									placeholder-gray-200
									focus:outline-none
									focus:bg-discord-blurple-630
									focus:border-gray-200
									focus:text-gray-200
									focus:placeholder-gray-200
									focus:ring-1 focus:ring-inset focus:ring-white
									sm:text-sm
								"
								placeholder="Search"
								type="search"
							/>
						</div>
					</div>
				</div>
				<div class="relative z-10 flex items-center lg:hidden">
					<button
						type="button"
						class="
							rounded-md
							p-2
							inline-flex
							items-center
							justify-center
							text-gray-200
							hover:bg-discord-blurple-630
							hover:text-white
							focus:outline-none
							focus:ring-2 focus:ring-inset focus:ring-white
						"
						aria-controls="mobile-menu"
						:aria-expanded="open"
						@click="open = !open"
					>
						<span class="sr-only">Open menu</span>
						<heroicons-outline-menu :class="{ hidden: open, block: !open }" />
						<heroicons-outline-x :class="{ block: open, hidden: !open }" />
					</button>
				</div>
			</div>
		</div>

		<nav v-if="open" id="mobile-menu" class="lg:hidden" aria-label="Global">
			<div class="pt-2 pb-3 px-2 space-y-1">
				<router-link
					to="/"
					class="
						text-gray-200
						hover:bg-discord-blurple-630
						hover:text-white
						block
						rounded-md
						py-2
						px-3
						text-base
						font-semibold
					"
					>discord.js</router-link
				>

				<router-link
					to="/docs"
					class="
						text-gray-200
						hover:bg-discord-blurple-630
						hover:text-white
						block
						rounded-md
						py-2
						px-3
						text-base
						font-semibold
					"
					>Documentation</router-link
				>

				<a
					href="#"
					class="
						text-gray-200
						hover:bg-discord-blurple-630
						hover:text-white
						block
						rounded-md
						py-2
						px-3
						text-base
						font-semibold
					"
					target="_blank"
					rel="noopener"
					>GitHub</a
				>

				<a
					href="https://discordjs.guide"
					class="
						text-gray-200
						hover:bg-discord-blurple-630
						hover:text-white
						block
						rounded-md
						py-2
						px-3
						text-base
						font-semibold
					"
					target="_blank"
					rel="noopener"
					>Guide</a
				>
			</div>
		</nav>
	</header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import { useStore } from '~/store';

const store = useStore();

const open = ref(false);
const repository = computed(() => store.state.source?.repo);
</script>
