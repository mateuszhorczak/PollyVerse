export default defineNuxtConfig({
	app: {
		head: {
			title: "PollyVerse",
			viewport: "width=device-width, initial-scale=1",
			charset: "utf-8",
			link: [
				{
					rel: "icon",
					type: "image/ico",
					href: "/favicon.ico",
					sizes: "32x32",
				},
				{
					rel: "icon",
					type: "image/ico",
					href: "/favicon-16x16.ico",
					sizes: "16x16",
				},
				{
					rel: "icon",
					type: "image/ico",
					href: "/favicon-512x512.ico",
					sizes: "512x512",
				},
				{
					rel: "manifest",
					href: "/app.webmanifest",
				},
			],
		},
	},
	srcDir: "src/",
	ssr: false,
	devtools: { enabled: true },
	modules: ["@pinia/nuxt", "@nuxtjs/google-fonts", "@unocss/nuxt", "@nuxtjs/stylelint-module", "nuxt-icon", "@nuxt/image"],
	googleFonts: {
		families: {
			Roboto: true,
		},
	},
	stylelint: {
		lintOnStart: false,
	},
	css: ["@unocss/reset/tailwind-compat.css", "~/assets/css/main.css"],
});
