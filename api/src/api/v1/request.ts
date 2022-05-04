import { DataObject, isDataObject } from './utils';

export class Request {
	// Action
	public action: string;
	// Data
	public data: DataObject;
	// CSRF token
	public csrfToken: string | undefined;
	// Request language
	public language: string;

	/**
	 * Create a new request
	 * @param action The action to be performed
	 * @param data An object containing the data to be sent
	 * @param csrfToken A CSRF token to be sent or undefined
	 * @param language The language of the request
	 */
	public constructor(
		action: string,
		data: DataObject,
		csrfToken: string | undefined,
		language = 'en'
	) {
		this.action = action;
		this.data = data;
		this.csrfToken = csrfToken;
		this.language = language;
	}

	/**
	 * Create a new request from a unknown object
	 * @param objUnknown The object to be converted
	 * @returns A new request or undefined
	 */
	public static deserialize(objUnknown: unknown): Request | undefined {
		// Make sure the object is an object
		if (objUnknown instanceof Object === false) return;
		// Tell typescript that the object is an object
		const obj = objUnknown as { [key: string]: unknown };
		// Make sure the object has the correct keys with the correct types
		if (
			typeof obj.action !== 'string' ||
			!isDataObject(obj.data) ||
			(
				typeof obj.csrfToken !== 'string' &&
				typeof obj.csrfToken !== 'undefined'
			) ||
			typeof obj.language !== 'string'
		) return;
		console.log(objUnknown);
		// Return a new request
		return new Request(
			obj.action,
			obj.data,
			obj.csrfToken,
			obj.language
		);
	}
}