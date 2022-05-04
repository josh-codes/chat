import { Express } from 'express';

// API
import { createv1Routes } from './v1';

// Create all the routes from diffrent api versions
export const createRoutes = (app: Express) => {
	// Create the v1 routes
	createv1Routes(app);
};