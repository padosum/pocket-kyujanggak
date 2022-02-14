import { defineConfig } from 'vite'

import { createHtmlPlugin } from 'vite-plugin-html'
import { ViteWebfontDownload } from 'vite-plugin-webfont-dl'

export default defineConfig({
	root: './src',
	server: {
		proxy: {
			'/api/bookExist': {
				target: 'http://data4library.kr',
				changeOrigin: true
			}
		} 
	},
	plugins: [
		createHtmlPlugin({
			minify: true,
			entry: 'main.js',
			template: 'index.html',
			inject: {
				data: {
					title: '포켓 규장각',
					injectScript: `<script src="https://kit.fontawesome.com/b21e3700d5.js" crossorigin="anonymous"></script>`
				}
			}
		}),
		ViteWebfontDownload([
			'https://fonts.googleapis.com/css2?family=Nanum+Myeongjo&family=Noto+Sans+KR&display=swap'
		])
	]
})