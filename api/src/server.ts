import express, { Express } from 'express';
import { config } from 'dotenv';
import { createRoutes } from './api';

// Express app
let app: Express | undefined;

// Load the local env
config();

export const createServer = () => {
	// Create the express app
	app = express();
	// Use the express JSON parser
	app.use(express.json());
	// Create all the routes
	createRoutes(app);
	// Start the server
	app.listen(
		isNaN(parseInt(process.env.APP_PORT || ''))
			? 5000
			: parseInt(process.env.APP_PORT || '')
	);
};
