console.log('Starting up... **address-service***');
/**
 * Entry point for the address service application.
 * 
 * This script sets up the HTTP server, connects to the NATS streaming server,
 * and starts listening for events and incoming HTTP requests.
 * 
 * @module index
 */

/**
   * Asynchronously runs the server setup and event listener initialization.
   * 
   * - Normalizes the port from environment variables or defaults to 3000.
   * - Creates an HTTP server using the Express app.
   * - Connects to the NATS streaming server with specified cluster ID, client ID, and URL.
   * - Initializes the UserRegisteredListener to listen for user registration events.
   * - Starts the HTTP server and sets up error and listening event handlers.
   * 
   * @async
   * @function run
   * @throws Will log an error and exit the process with status code 1 if any error occurs during setup.
   */
import app from '../app';
import { createServer } from 'http';
import { onError } from './libs/onError';
import { onListening } from './libs/onListening';
import { normalizePort } from './libs/normalizePort';
import { natsWrapper } from '@webvital/micro-common';

import listeners from '../events';


const Logger = console

const run = async () => {
    const port = normalizePort(process.env.PORT || 3000);
    try {
        
        const server = createServer(app);
        await natsWrapper.connect('ticketing', 'address-service', 'http://nats-srv:4222')
        listeners();
        server.listen(port);
        server.on('error', (e) => onError(e, port));
        server.on('listening', onListening(server));

    } catch (err: any) {
        Logger.error(err);
        process.exit(1);
    }
    // });

}

run();