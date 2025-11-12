import { defineConfig } from "wxt";

export default defineConfig({
	manifest: {
		name: "Cacoo Link Title",
		description: "",
		permissions: ["storage"],
	},
	imports: false,
	modules: ["@wxt-dev/auto-icons"],
	srcDir: "src",
});
