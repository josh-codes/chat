import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { UserModel } from './User';

@Entity()
export class UserSessionModel extends BaseEntity {
	/** The random unique session ID */
	@PrimaryGeneratedColumn('uuid')
		id!: string;

	/** The random token/password */
	@Column({
		nullable: false
	})
		token!: string;

	/** The refresh token/password */
	@Column({
		nullable: false
	})
		refreshToken!: string;
	
	/** The UserAgent of the user */
	@Column({
		nullable: false
	})
		userAgent!: string;

	/** The 6 diget verification code (nullable) [PLEASE ONLY USE ONCE] */
	@Column({
		nullable: true
	})
		verificationCode!: number;
	
	/** Wether verifacion is required */
	@Column({
		default: true,
		nullable: false
	})
		verificationRequired!: boolean;

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