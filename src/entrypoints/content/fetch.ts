import { settings } from "@/utils/settings";
import { getCachedData, setCachedData } from "./cache";

// In-flight request deduplication
const inFlightRequests = new Map<string, Promise<unknown>>();

export const client = async <T>(
	pathname: `/api/${string}`,
	ttl = 3 * 60 * 1000 * 0,
): Promise<T> => {
	const { apiKey } = await settings.getValue();
	if (!apiKey) {
		throw new Error("API key is not set in settings.");
	}

	// Create cache key (excluding apiKey for privacy)
	const cacheKey = `cacoo.com${pathname}`;

	// Check cache first
	const cachedData = await getCachedData<T>(cacheKey, ttl);
	if (cachedData !== undefined) {
		return cachedData;
	}

	// Check if request is already in flight
	const existingRequest = inFlightRequests.get(cacheKey);
	if (existingRequest) {
		return existingRequest as Promise<T>;
	}

	// Make new request
	const requestPromise = (async () => {
		try {
			const url = new URL(pathname, "https://cacoo.com");
			url.searchParams.set("apiKey", apiKey);
			const response = await fetch(url);
			const data = (await response.json()) as T;

			// Store in cache
			await setCachedData(cacheKey, data);

			return data;
		} finally {
			// Remove from in-flight requests
			inFlightRequests.delete(cacheKey);
		}
	})();

	// Store in-flight request
	inFlightRequests.set(cacheKey, requestPromise);

	return requestPromise;
};
