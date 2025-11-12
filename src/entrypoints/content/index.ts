import { defineContentScript } from "wxt/utils/define-content-script";

export default defineContentScript({
	matches: ["<all_urls>"],
	allFrames: true,
	async main() {
		console.log("Application ready.");
	},
});
