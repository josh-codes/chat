import { AppDB } from './model';
import { createServer } from './server';

const main = async () => {
	// Connect to the database
	await AppDB.initialize();

	// Create the server
	createServer();
};

main();