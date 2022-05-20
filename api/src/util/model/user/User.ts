import { UserModel } from '../../../model/user/User';

export class User {
	/** The user id */
	readonly id: number;
	/** The user data */
	private user: UserModel;

	/**
	 * Create a new user instance
	 * @param user The user data
	 */
	constructor(user: UserModel) {
		// Set the user data
		this.id = user.id;
		this.user = user;
	}

	/**
	 * Re-fetch the user data from the db
	 * @returns A new user instance
	 */
	public async fetch() {
		// Get the user
		const user = await UserModel.findOne({ where: { id: this.id } });
		// Return the user
		return user ? new User(user) : undefined;
	}

	/**
	 * Get the user data
	 * @returns The user data
	 */
	public getUser() {
		return {
			id: this.id,
			email: this.user.email,
			username: this.user.username,
			createdAt: this.user.createdAt,
			birthday: this.user.birthday,
			nickname: this.user.nickname,
			role: this.user.role,
			emailVerified: this.user.emailVerified,
			emailVerificationCode: this.user.emailVerificationCode,
			preferedLanguage: this.user.language
		};
	}

}