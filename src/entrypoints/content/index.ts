import { defineContentScript } from "wxt/utils/define-content-script";
import { cleanExpiredCache } from "./cache";
import { onMatchNode } from "./onMatchNode";
import { unfurler } from "./unfurler";

export default defineContentScript({
	matches: ["<all_urls>"],
	allFrames: true,
	async main() {
		cleanExpiredCache().catch(console.error);

		onMatchNode(unfurler);
	},
});
