import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
/* import { VitePWA } from 'vite-plugin-pwa'; */
import Pages from 'vite-plugin-pages';
import ViteComponents from 'vite-plugin-components';
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons';
import { resolve } from 'path';
import { execSync } from 'child_process';
import { readFileSync } from 'fs';

export default defineConfig({
	resolve: {
		alias: {
			'~/': `${resolve(__dirname, 'src')}/`,
		},
	},
	define: {
		GIT_COMMIT_HASH: JSON.stringify(execSync('git rev-parse HEAD').toString().trim()),
		PACKAGE_VERSION: JSON.stringify(JSON.parse(readFileSync('package.json', 'utf-8')).version),
		BUILT_AT: JSON.stringify(Date.now()),
	},
	plugins: [
		vue(),
		Pages(),
		/* VitePWA({
			strategies: 'injectManifest',
			base: '/',
			srcDir: 'src',
			filename: 'service-worker.ts',
			manifest: {
				name: 'Discord.js',
				short_name: 'djs',
				theme_color: '#33b5e5',
				background_color: '#282b30',
				display: 'minimal-ui',
				icons: [
					{
						src: './static/icons/android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any maskable',
					},
					{
						src: './static/icons/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
			},
		}), */
		ViteComponents({
			customComponentResolvers: [
				ViteIconsResolver({
					componentPrefix: '',
				}),
			],
		}),
		ViteIcons(),
	],

	optimizeDeps: {
		include: ['vue', 'vue-router', '@vueuse/core'],
		exclude: ['vue-demi'],
	},
});
