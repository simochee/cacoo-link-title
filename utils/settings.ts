import { type } from "arktype";
import { storage } from "wxt/utils/storage";

const SettingsSchema = type({
	apiKey: "string?",
});

export type Settings = type.infer<typeof SettingsSchema>;

const getFallbackValue = (): Settings => {
	try {
		const result = SettingsSchema(
			JSON.parse(import.meta.env.VITE_FALLBACK_SETTINGS || "{}"),
		);

		return result instanceof type.errors ? {} : result;
	} catch {
		return {};
	}
};

export const settings = storage.defineItem<Settings>("local:settings", {
	fallback: getFallbackValue(),
});
