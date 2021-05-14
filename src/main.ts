import { createApp } from 'vue';
import VueHighlightJS from 'vue3-highlightjs';
import VueTippy from 'vue-tippy';

import App from './App.vue';
import { store, key } from './store';
import router from './router';

import './styles/index.css';
import './styles/discord-hljs.css';
import 'tippy.js/dist/tippy.css';
import './styles/discord-tippy.css';

declare global {
	interface Window {
		GIT_COMMIT_HASH: string;
		BUILT_AT: string;
	}
}

const app = createApp(App);
app.use(store, key);
app.use(router);
app.use(VueHighlightJS);
app.use(VueTippy);
app.mount('#app');
