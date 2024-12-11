/**
 * Event listener for HTTP server "listening" event.
 *
 * @param server - The HTTP server that emits the event.
 * @returns A function that handles the event.
 */
import { Server } from 'http';
const Logger = console
export function onListening(server: Server) {
    return (): void => {
        const addr = server.address();
        const bind: string | null =
            typeof addr === 'string' ? `pipe  ${addr}` : `port ${addr?.port}`;
        Logger.info(`Listening on ${bind} `);
    };
}