/**
 * Event listener for HTTP server "error" event.
 *
 * @param error - The error that occurred.
 */

const Logger = console
export function onError(error: any, port :number): void {
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