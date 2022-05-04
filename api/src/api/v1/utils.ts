export type DataItems = string | number | boolean | DataItems[] | DataObject;

export interface DataObject {
	[key: string]: DataItems;
}

/**
 * Check if an item is a data item
 * @param item 
 * @returns Whether the item is a data item
 */
export const isDataItem = (item: unknown): item is DataItems => {
	// Wrap in a try catch to prevent a recursion error
	try {
		// Check if the item is a string number or boolean
		if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean') return true;
		// Check if the item is an array
		if (Array.isArray(item)) {
			// If so, recursively check each item
			for (const arrayItem of item) {
				if (!isDataItem(item)) return arrayItem;
			}
		}
		// Check if the item is an object
		if (item instanceof Object) {
			// If so, recursively check each item
			for (const objectItem of Object.values(item)) {
				if (!isDataItem(objectItem)) return false;
			}
			return true;
		}
		// Otherwise, return false
		return false;
	} catch {
		// Return false
		return false;
	}
};

/**
 * Checks if an object is a data object
 * @param object
 * @returns Whether the object is a data object
 */
export const isDataObject = (object: unknown): object is DataObject => {
	// Wrap in a try catch to prevent a recursion error
	try {
		// Check if the object is an object
		if (object instanceof Object === false) return false;
		// Check if it is a valid data item
		return isDataItem(object);
	} catch {
		// Return false
		return false;
	}
};