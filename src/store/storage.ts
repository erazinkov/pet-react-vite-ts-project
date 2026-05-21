export function loadState<T>(key: string): T | undefined {
	try {
		const serializedState = localStorage.getItem(key);
		if (serializedState === null) {
			return undefined;
		}
		// console.log('Loaded state from localStorage:', serializedState);
		return JSON.parse(serializedState) as T;
	} catch (err) {
		console.error('Error loading state from localStorage:', err);
		return undefined;
	}
}

export function saveState<T>(key: string, state: T): void {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem(key, serializedState);
	} catch (err) {
		console.error('Error saving state to localStorage:', err);
	}
}