import { AppDB } from '../../../model';
import { UserModel } from '../../../model/user/User';
import { SessionModel } from '../../../model/user/Session';
import { User } from './User';
import { EqualOperator } from 'typeorm';
import { Session } from './Session';

export class SessionManager {
	/** The DB */
	private db = AppDB;
	/** The user */
	public user: User;
	/** The use model */
	private userModel: UserModel;

	/**
	 * Construct a new session manager for a user
	 */
	public constructor(user: User, userModel: UserModel) {
		// Set the user
		this.user = user;
		this.userModel = userModel;
	}

	/**
	 * Get a session by ID
	 * @param sessionId The session ID
	 * @returns The session or undefined if not found
	 */
	public async getSessionById(sessionId: string) {
		// Get the session
		const session = await this.db
			.getRepository(SessionModel)
			.findOne({
				where: {
					id: sessionId,
					user: new EqualOperator(this.userModel)
				}
			});
		// Return the session
		return session ? new Session(session, this.user, this.userModel) : undefined;
	}

	/**
	 * Gets many sessions owned by a user
	 * @param userId The user ID
	 * @param limit The limit
	 * @param offset The offset
	 * @returns The sessions
	 */
	public async getSessionsByUser(userId: number, limit: number, offset: number) {
		// Get the sessions
		const sessions = await this.db
			.getRepository(SessionModel)
			.find({
				where: {
					user: new EqualOperator(this.userModel)
				},
				take: limit,
				skip: offset
			});
		// Return the sessions
		return sessions.map(session => new Session(session, this.user, this.userModel));
	}
}