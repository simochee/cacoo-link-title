export type CacooDiagram = {
	title: string;
	organizationName: string;
	folderName: string;
	sheets: Array<{
		uid: string;
		name: string;
	}>;
	comments: Array<{
		nickname: string;
	}>;
};
