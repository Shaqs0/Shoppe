export function loadState<T>(key: string): T | undefined {
	try {
		const jsonState = localStorage.getItem(key);
		if (!jsonState) {
			return undefined;
		}
		return JSON.parse(jsonState);
	} catch (e) {
		console.error('Error loading state from localStorage:', e);
		return undefined;
	}
}

export function saveState<T>(state: T, key: string) {
	try {
		const stringState = JSON.stringify(state);
		localStorage.setItem(key, stringState);
	} catch (e) {
		console.error('Error saving state to localStorage:', e);
	}
}
