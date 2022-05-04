import express, { Express, Request, Response } from 'express';
import { WebSocketServer } from 'ws';
import { createServer as httpCreateServer } from 'http';

/// Express app
let app: Express | undefined;
/// WebSocket server
let ws: WebSocketServer | undefined;

export const createServer = () => {
	// Create the express app
	app = express();
	// Use the express JSON parser
	app.use(express.json());
	// Create the web socket server
	ws = new WebSocketServer({
		server: httpCreateServer(app)
	});
	// Listen for post requests
	app.post('/api/action', (req: Request, res: Response) => {
		// Get the body
		const rawBody = req.body;
		// Make sure the body is an object
		if (rawBody instanceof Object) {
			
		}
	});
};