import { DataObject } from './utils';

export class Response<T = DataObject> {
	// Type
	private code: 200 | 400 | 401 | 500;
	// Message
	private message: string | undefined;
	// Data
	private data: T;

	/**
	 * Create a new response
	 * @param code 200: OK, 400: Bad Request, 401: Unauthorized, 500: Internal Server Error
	 * @param data An object containing the data to be sent or undefined
	 * @param message A message to be sent or undefined
	 */
	public constructor(
		code: 200 | 400 | 401 | 500,
		data: T,
		message: string | undefined = undefined
	) {
		// Set the code
		this.code = code;
		// Set the data
		this.data = data;
		// Set the message
		this.message = message || undefined;
	}

	/**
	 * Serialize the response
	 * @returns A serialized response
	 */
	public serialize(): string {
		return JSON.stringify({
			code: this.code,
			data: this.data,
			message: this.message
		});
	}
}