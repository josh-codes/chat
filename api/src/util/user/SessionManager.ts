import { AppDB } from '../../model';
import { UserModel } from '../../model/user/User';
import { UserSessionModel } from '../../model/user/Session';
import { User } from './User';

export class SessionManager {
	/** The DB */
	private db = AppDB;
	/** The user */
	public user: User;

	/**
	 * Construct a new session manager for a user
	 */
	public constructor(user: User, userModel: UserModel) {
		// Set the user
		this.user = user;
	}

	/**
	 * Get a user by ID
	 * @param sessionId The session ID
	 * @returns The session or undefined if not found
	 */
	public async getSessionById(sessionId: string) {
		// TODO: implement
	}
}