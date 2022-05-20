import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { UserModel } from './User';

@Entity()
export class SessionModel extends BaseEntity {
	/** The random unique session ID */
	@PrimaryGeneratedColumn('uuid')
		id!: string;

	/** The random token/password */
	@Column({
		nullable: false
	})
		token!: string;
	
	/** The time the token expires */
	@Column({
		nullable: false
	})
		tokenExpiration!: Date;

	/** The refresh token/password */
	@Column({
		nullable: false
	})
		refreshToken!: string;
	
	/** The CSRF token (nullable) [PLEASE ONLY USE ONCE] */
	@Column({
		nullable: true
	})
		csrfToken!: string;

	/** The 6 digit verification code (nullable) [PLEASE ONLY USE ONCE] */
	@Column({
		nullable: true
	})
		verificationCode!: number;

	/** How many times the verification code has been entered incorrectly [MAX = 6] [RESET AFTER VERIFICATION] */
	@Column({
		default: 0,
		nullable: false
	})
		verificationAttempts!: number;

	/** When the session was created */
	@CreateDateColumn()
		createdAt!: Date;
	
	/** When the session will be deleted */
	@Column({
		nullable: false,
		type: 'date'
	})
		expiresAt!: Date;
	
	/** The User who created the session */
	@ManyToOne(() => UserModel, (userSession) => userSession.sessions, {
		nullable: false
	})
		user!: UserModel;
}