import Hapi from '@hapi/hapi';
import { route } from './routes.js';

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*']
            }
        }
    });

    server.route(route);

    await server.start();
    console.log(`Server sedang berjalan di: ${server.info.uri}`);
};

init();
