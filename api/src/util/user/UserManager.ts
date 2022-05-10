import { AppDB } from '../../model';
import { UserModel } from '../../model/user/User';
import { User } from './User';

export class UserManager {
	/** The DB */
	private db = AppDB;

	/**
	 * Get a user by ID
	 * @param userId The user ID
	 * @returns The user or undefined if not found
	 */
	public async getUserById(userId: number) {
		// Get the user
		const user = await this.db
			.getRepository(UserModel)
			.findOne({ where: { id: userId } });
		// Return the user
		return user ? new User(user) : undefined;
	}

	/**
	 * Get a user by email
	 * @param email The user email
	 * @returns The user or undefined if not found
	 */
	public async getUserByEmail(email: string) {
		// Get the user
		const user = await this.db
			.getRepository(UserModel)
			.findOne({ where: { email } });
		// Return the user
		return user ? new User(user) : undefined;
	}

	/**
	 * Get a user by username
	 * @param username The user username
	 * @returns The user or undefined if not found
	 */
	public async getUserByUsername(username: string) {
		// Get the user
		const user = await this.db
			.getRepository(UserModel)
			.findOne({ where: { username } });
		// Return the user
		return user ? new User(user) : undefined;
	}
}