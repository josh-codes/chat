import { DataObject } from './utils';

export enum ResponseCode {
	/** Success */
	OK = 200,
	/** Bad request from the client */
	BAD_REQ = 400,
	/** Not logged in / No CSRF / Verification code required */
	UNAUTHORIZED = 401,
	/** If the server does not want to prosses the request (Too many password/OTP attempts) */
	FORBIDDEN = 403,
	/** If an unexpected internal server error happens */
	INTERNAL_ERR = 500
}

export class Response<T = DataObject> {
	/** Type */
	private code: ResponseCode;
	/** Message */
	private message: string | undefined;
	/** Data */
	private data: T;

	/**
	 * Create a new response
	 * @param code 200: OK, 400: Bad Request, 401: Unauthorized, 500: Internal Server Error
	 * @param data An object containing the data to be sent or undefined
	 * @param message A message to be sent or undefined
	 */
	public constructor(
		code: ResponseCode,
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