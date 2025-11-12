/// <references types="vite/client" />

type ImportMetaEnv = {
	readonly VITE_FALLBACK_SETTINGS: string;
};

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
