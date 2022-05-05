

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum UserModelRole {
	SYSTEM_ADMINISTRATOR = 'SYS_ADMIN',
	ADMINISTRATOR = 'ADMIN',
	USER = 'USER'
}

@Entity()
export class UserModel extends BaseEntity {
	/** The user's ID (Auto Incromenting) */
	@PrimaryGeneratedColumn()
		id!: number;

	/** When the user was created */
	@CreateDateColumn()
		createdAt!: Date;

	/** When the user was born */
	@Column({
		nullable: false,
		type: 'date'
	})
		birthday!: Date;

	/** The users username (unique) */
	@Column({
		nullable: false,
		unique: true,
	})
		username!: string;

	/** The users email (unique) */
	@Column({
		nullable: false,
		unique: true
	})
		email!: string;

	/** If the email has been verified */
	@Column({
		default: false,
		nullable: false
	})
		emailVerified!: boolean;

	/** The users display name (nullable) */
	@Column()
		nickname!: string;

	/** What permissions the user has */
	@Column({
		enum: UserModelRole,
		nullable: false,
		default: UserModelRole.USER,
		type: 'enum'
	})
		role!: UserModelRole;
	
	/** The users set language */
	@Column({
		nullable: false,
		default: 'en'
	})
		language!: string;

	/** The users password (nullable) */
	@Column({
		nullable: true
	})
		password!: string;

	/** The password salt (nullable) */
	@Column({
		nullable: true
	})
		passwordSalt!: string;
}