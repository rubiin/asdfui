import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.{ts,tsx}"],
	target: "node16.20",
	format: "esm",
	sourcemap: true,
	minify: true,
	shims: true,
	// https://github.com/evanw/esbuild/issues/1921
	banner: {
		js: `
				import { createRequire as _createRequire } from 'node:module';
				const require = _createRequire(import.meta.url);
			`,
	},
	external: ["react-devtools-core", "yoga-wasm-web"],
});
