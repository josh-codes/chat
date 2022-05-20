import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

import { UserModel } from './user/User';
import { SessionModel } from './user/Session';

// Load the local env
config();

export const AppDB = new DataSource({
	type: 'postgres',
	host: process.env.APP_DB_HOST || '',
	port: isNaN(parseInt(process.env.APP_DB_PORT || ''))
		? 0
		: parseInt(process.env.APP_DB_PORT || ''),
	username: process.env.APP_DB_USER || '',
	password: process.env.APP_DB_PASSWORD || '',
	database: process.env.APP_DB_NAME || '',
	synchronize: true,
	logging: false,
	entities: [
		UserModel,
		SessionModel
	]
});