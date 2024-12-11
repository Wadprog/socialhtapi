export function normalizePort(val: string | number): number {
    const port = typeof val === 'string' ? parseInt(val, 10) : val;
    if (isNaN(port) || port <= 0) {
        throw new Error('Invalid port number');
    }
    return port;
}