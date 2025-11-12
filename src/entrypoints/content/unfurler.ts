import { regex } from "arkregex";
import type { CacooDiagram } from "./cacoo";
import { client } from "./fetch";
import { replaceUrlInTextNodes } from "./replaceUrlInTextNodes";

export const unfurler = async (el: HTMLAnchorElement) => {
	const url = new URL(el.href);
	const parsed = regex(
		"^https?://cacoo.com/diagrams/(?<diagramId>[a-zA-Z0-9]+)(?:/(?<sheetId>[a-zA-Z0-9]+))?(?:/(?:shapes/(?<shapeId>[a-zA-Z0-9-]+)|a/(?<commentId>[a-zA-Z0-9]+)))?$",
	).exec(url.href)?.groups;
	if (!parsed) return;

	const diagram = await client<CacooDiagram>(
		`/api/v1/diagrams/${encodeURIComponent(parsed.diagramId)}.json`,
	);
	const sheet = diagram.sheets.find((s) => s.uid === parsed.sheetId);

	let title = "";

	title += diagram.title;

	if (diagram.folderName) {
		title = `${diagram.folderName} / ${title}`;
	}

	if (parsed.shapeId) {
		title = `Shape in ${title}`;
	}
	if (parsed.commentId) {
		title = `Comment on ${title}`;
	}

	title = `[${diagram.organizationName}] ${title}`;

	if (sheet) {
		title += ` - ${sheet.name}`;

		const page = diagram.sheets.indexOf(sheet) + 1;
		title += ` (${page}/${diagram.sheets.length})`;
	}

	replaceUrlInTextNodes(el, title);
};
