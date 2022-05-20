import { randomBytes } from 'crypto';
import { EqualOperator } from 'typeorm';
import { AppDB } from '../../../model';
import { SessionModel } from '../../../model/user/Session';
import { UserModel } from '../../../model/user/User';
import { SharedState } from '../SharedState';
import { User } from './User';

export class Session implements SharedState<Session> {
	/** The DB */
	private db = AppDB;
	/** The session id */
	public id: string;
	/** The session data */
	private model: SessionModel;
	/** The user it belongs to */
	public user: User;
	/** The users data */
	private userModel: UserModel;

	/** Create a new session instance
	 * @param session The session data
	 * @param user The user it belongs to
	 * @param userModel The users data
	 */
	constructor(session: SessionModel, user: User, userModel: UserModel) {
		// Set the session data
		this.id = session.id;
		this.model = session;
		this.user = user;
		this.userModel = userModel;
	}

	/** The static config */
	static config = {
		/** The token expiration time in seconds (7days) */
		tokenExpiration: 60 * 60 * 24 * 7,
		/** The refresh token expiration time in seconds (30days) */
		refreshTokenExpiration: 60 * 60 * 24 * 30,
		/** The length of a token */
		tokenLength: 64
	};

	/**
	 * Create a random token
	 * @returns The token
	 */
	public static createToken(): string {
		// Create a random token(
		const token = randomBytes(Session.config.tokenLength).toString('hex');
		// Return the token
		return token;
	}

	/**
	 * Reload the item from the DB
	 */
	public async fetch(): Promise<Session | undefined> {
		// Get the session
		const session = await this.db
			.getRepository(SessionModel)
			.findOne({
				where: {
					id: this.id,
					user: new EqualOperator(this.userModel)
				}
			});
		// Return the session
		return session ? new Session(session, this.user, this.userModel) : undefined;
	}

	/**
	 * Check if a session has been verified
	 * @returns If the session has been verified
	 */
	public isVerified = () => this.model.verificationCode === null;

	/**
	 * Check if a session is expired
	 * @returns If the session is expired
	 */
	public isExpired = () => this.model.expiresAt.getTime() < Date.now();

	/**
	 * Check if the session token is expired
	 * @returns If the session token is expired
	 */
	public isTokenExpired = () => this.model.tokenExpiration.getTime() < Date.now();
}