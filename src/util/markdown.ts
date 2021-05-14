import marked from 'marked';
import { highlight } from 'highlight.js';

const renderer = new marked.Renderer();

marked.setOptions({
	highlight: function (code, lang) {
		return highlight(code, { language: lang }).value;
	},
});
marked.use({
	renderer: {
		link: (href, title, text) => {
			const local = href?.startsWith(`${location.protocol}//${location.hostname}`);
			const html = renderer.link.call(renderer, href, title, text);
			console.log(html);
			return local
				? html
				: html
						.replace(/^<a /, '<a target="_blank" rel="noreferrer noopener nofollow" ')
						.replace(
							/<\/a>$/,
							' <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a>',
						);
		},
	},
});

export function markdown(input: string) {
	const content = marked(input);
	return content.replace(/<(info|warn)>([\s\S]+)<\/\1>/gi, '<div class="$1">$2</div>');
}
