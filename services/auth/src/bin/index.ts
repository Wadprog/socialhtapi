console.log('Starting up... ****auth-\service ****');
import app from '../app';
import { createServer, Server } from 'http';
import { natsWrapper } from '@webvital/micro-common';

// // import database from '../../models';
const Logger = console;
/**
 * Normalizes a port into a number.
 *
 * @param val - The port value to normalize, which can be a string or a number.
 * @returns The normalized port number.
 * @throws Will throw an error if the port number is invalid (NaN or less than or equal to 0).
 */
function normalizePort(val: string | number): number {
    const port = typeof val === 'string' ? parseInt(val, 10) : val;
    if (isNaN(port) || port <= 0) {
        throw new Error('Invalid port number');
    }
    return port;
}

/**
 * Event listener for HTTP server "listening" event.
 *
 * @param server - The HTTP server that emits the event.
 * @returns A function that handles the event.
 */
function onListening(server: Server) {
    return (): void => {
        const addr = server.address();
        const bind: string | null =
            typeof addr === 'string' ? `pipe  ${addr}` : `port ${addr?.port}`;
        Logger.info(`Listening on ${bind} `);
    };
}



// if (!process.env.PORT) {
//     Logger.error('PORT is not defined');
//     process.exit(1);
// }
const port = normalizePort(process.env.PORT || 3000);

/**
 * Event listener for HTTP server "error" event.
 *
 * @param error - The error that occurred.
 */

function onError(error: any): void {
    if (error.syscall !== 'listen') throw error;
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            Logger.error(`${bind} requires elevated privileges`);
            process.exit(1);
        case 'EADDRINUSE':
            Logger.error(`${bind}  is already in use`);
            process.exit(1);
        default:
            throw error;
    }
}


// database.sequelize.sync({ logging: false, alter: true }).then(() => {
const run = async () => {
    try {
        await natsWrapper.connect('ticketing', 'auth-service', 'http://nats-srv:4222');

        const server = createServer(app);
        server.listen(port);
        server.on('error', onError);
        server.on('listening', onListening(server));
    } catch (err: any) {
        Logger.error(err);
        process.exit(1);
    }
}

run();
