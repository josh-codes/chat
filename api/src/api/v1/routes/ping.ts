import { registerRoute } from '..';
import { Response } from '../response';

registerRoute('ping', 'noAuth', () => {
	return new Response(200, {}, 'pong');
});