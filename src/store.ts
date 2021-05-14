import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

import DocsSource from './data/DocsSource';
import MainSource from './data/MainSource';

import { Documentation, DocumentationCustomFile } from './interfaces/Documentation';

export interface State {
	source: DocsSource | null;
	tag: string | null;
	docs: Documentation | null;
	file: DocumentationCustomFile | null;
}

export const key: InjectionKey<Store<State>> = Symbol('docs');

export const store = createStore<State>({
	state: {
		source: MainSource,
		tag: MainSource.defaultTag,
		docs: null,
		file: null,
	},
	mutations: {
		setSource(state, { source }: { source: DocsSource }) {
			state.source = source;
		},
		setTag(state, { tag }: { tag: string }) {
			state.tag = tag;
		},
		setDocs(state, { docs }: { docs: any }) {
			state.docs = docs;
		},
		setFile(state, { file }: { file: any }) {
			state.file = file;
		},
	},
});

export function useStore() {
	return baseUseStore(key);
}
