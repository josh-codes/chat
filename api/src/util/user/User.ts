import { UserModel } from '../../model/user/user';

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
	 * Update the user data from the db
	 * @returns A new user instance
	 */
	public async update() {
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
		return this.user;
	}

}