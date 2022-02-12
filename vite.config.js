import { defineConfig } from 'vite'

import { createHtmlPlugin } from 'vite-plugin-html'

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
				}
			}
		})
	]
})