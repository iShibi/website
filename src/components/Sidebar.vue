<template>
	<div class="hidden lg:flex lg:flex-shrink-0">
		<div class="flex flex-col w-64">
			<div class="flex flex-col h-0 flex-1">
				<div class="flex-1 flex flex-col pb-4 overflow-y-auto">
					<nav class="mt-5 flex-1 px-2 space-y-1 border-0 border-r border-gray-300">
						<ul>
							<li v-for="(category, categoryId) in docs?.custom" :key="categoryId">
								<Disclosure v-slot="{ open }" :default-open="true">
									<DisclosureButton class="focus:outline-none">
										<div
											class="text-gray-800 dark:text-gray-100 py-2 text-md font-bold uppercase flex gap-1 items-center"
										>
											<heroicons-outline-chevron-right class="inline-block" :class="{ hidden: open }" />
											<heroicons-outline-chevron-down class="inline-block" :class="{ hidden: !open }" />
											{{ category.name }}
										</div>
									</DisclosureButton>
									<DisclosurePanel as="ul">
										<li v-for="(file, fileId) in category.files" :key="fileId">
											<router-link
												:to="{
													name: 'docs-source-tag-category-file',
													params: { source: source?.id, tag: tag, category: categoryId, file: fileId },
												}"
												class="
													text-gray-600
													dark:text-gray-300
													border-l-4 border-transparent
													rounded-sm
													hover:border-l-4 hover:border-discord-blurple-500
													hover:text-gray-800
													dark:hover:text-gray-100
													group
													flex
													items-center
													px-3
													py-2
													text-sm
													font-semibold
												"
												exact-active-class="border-l-4 border-discord-blurple-530 text-gray-900"
											>
												{{ typeof file === 'object' ? file.name : file }}
											</router-link>
										</li>
									</DisclosurePanel>
								</Disclosure>
							</li>

							<Disclosure v-slot="{ open }" as="li" :default-open="true">
								<DisclosureButton class="focus:outline-none">
									<div
										class="text-gray-800 dark:text-gray-100 py-2 text-md font-bold uppercase flex gap-1 items-center"
									>
										<heroicons-outline-chevron-right class="inline-block" :class="{ hidden: open }" />
										<heroicons-outline-chevron-down class="inline-block" :class="{ hidden: !open }" />
										Classes
									</div>
								</DisclosureButton>
								<DisclosurePanel as="ul">
									<li v-for="cls in docs?.classes" :key="cls.name">
										<router-link
											exact
											:to="{
												name: 'docs-source-tag-class-class',
												params: { source: source?.id, tag: tag, class: cls.name },
											}"
											class="
												text-gray-600
												dark:text-gray-300
												border-l-4 border-transparent
												rounded-sm
												hover:border-l-4 hover:border-discord-blurple-500
												hover:text-gray-800
												dark:hover:text-gray-100
												group
												flex
												items-center
												px-3
												py-2
												text-sm
												font-semibold
											"
											exact-active-class="border-l-4 border-discord-blurple-530 text-gray-900"
										>
											{{ cls.name }}
										</router-link>
									</li>
								</DisclosurePanel>
							</Disclosure>

							<Disclosure v-slot="{ open }" as="li" :default-open="true">
								<DisclosureButton class="focus:outline-none">
									<div
										class="text-gray-800 dark:text-gray-100 py-2 text-md font-bold uppercase flex gap-1 items-center"
									>
										<heroicons-outline-chevron-right class="inline-block" :class="{ hidden: open }" />
										<heroicons-outline-chevron-down class="inline-block" :class="{ hidden: !open }" />
										Typedefs
									</div>
								</DisclosureButton>
								<DisclosurePanel as="ul">
									<li v-for="typedef in docs?.typedefs" :key="typedef.name">
										<router-link
											exact
											:to="{
												name: 'docs-source-tag-typedef-typedef',
												params: { source: source?.id, tag: tag, typedef: typedef.name },
											}"
											class="
												text-gray-600
												dark:text-gray-300
												border-l-4 border-transparent
												rounded-sm
												hover:border-l-4 hover:border-discord-blurple-500
												hover:text-gray-800
												dark:hover:text-gray-100
												group
												flex
												items-center
												px-3
												py-2
												text-sm
												font-semibold
											"
											exact-active-class="border-l-4 border-discord-blurple-530 text-gray-900"
										>
											{{ typedef.name }}
										</router-link>
									</li>
								</DisclosurePanel>
							</Disclosure>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useStore } from '~/store';

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';

const store = useStore();

const source = computed(() => store.state.source);
const tag = computed(() => store.state.tag);
const docs = computed(() => store.state.docs);
const file = computed(() => store.state.file);
</script>
