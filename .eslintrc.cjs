module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	parser: "vue-eslint-parser",
	parserOptions: {
		parser: "@typescript-eslint/parser",
		ecmaVersion: "latest",
		baseUrl: ".",
		paths: {
			"@/*": ["src/*"],
		},
	},
	extends: ["prettier", "@nuxtjs/eslint-config-typescript", "plugin:prettier/recommended"],
	plugins: [],
	rules: {
		"vue/no-v-html": "off",
		"vue/multi-word-component-names": "off",
		"prettier/prettier": ["error"],
		semi: ["error", "always"],
	},
	settings: {
		"import/resolver": {
			alias: {
				map: [["@", "./src"]],
				extensions: [".js", ".jsx", ".ts", ".tsx", ".vue"],
			},
		},
	},
};
