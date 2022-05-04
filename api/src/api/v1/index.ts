import { Express } from 'express';
import { DataObject } from './utils';
import { Request } from './request';
import { Response } from './response';

interface RouteConfig {
	path: string;
	type: 'noAuth' | 'noCSRF' | 'fullAuth';
}

const appRoutes: {
	[key: string]: {
		config: RouteConfig;
		handler: (data: {
			body: DataObject;
			user: undefined;
			strings: undefined;
		}) => Response;
	};
} = {};

/**
 * Register a route
 * @param path The path of the route
 * @param type The type of authentication required
 * @param handler The handler of the route
 */
export const registerRoute = (
	path: string,
	type: 'noAuth' | 'noCSRF' | 'fullAuth',
	handler: (data: {
		body: DataObject;
		user: undefined;
		strings: undefined;
	}) => Response
) => {
	// Make sure the prototype is not being overwritten
	if (appRoutes[path] === appRoutes.__proto__)
		throw new Error('Prevented overwriting of prototype');
	// Make sure the path is not already registered
	if (appRoutes[path])
		throw new Error('Path already registered');
	// Register the route
	appRoutes[path] = {
		config: {
			path,
			type
		},
		handler
	};
};

// Import imports to register routes
import './imports';

// Create all the routes
export const createv1Routes = (app: Express) => {
	// Create the v1 routes
	app.post('/api/v1/action', (req, res) => {
		// Get the request
		const request = Request.deserialize(req.body);
		if (!request) {
			// If the request is invalid, return a bad request response
			return res
				.contentType('json')
				.send(new Response(400, undefined, 'Invalid request').serialize());
		}
		// Get the handler
		const handler = appRoutes[request.action];
		if (!handler) {
			// If the handler is invalid, return a bad request response
			return res
				.contentType('json')
				.send(new Response(400, undefined, 'Invalid action').serialize());
		}
		// If the handler does not require authentication, return the response
		if (handler.config.type === 'noAuth') {
			// Get the response
			const response = handler.handler({
				body: request.data,
				user: undefined,
				strings: undefined
			}).serialize();
			// Return the response
			return res.contentType('json').send(response);
		}
		// Get the user
		// TODO: Get the user
		// Get the response
		const response = handler.handler({
			body: request.data,
			user: undefined,
			strings: undefined
		}).serialize();
		// Send the response
		return res.contentType('json').send(response);
	});
};
