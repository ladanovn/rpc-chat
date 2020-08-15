import WebSocket from 'ws';

/**
 * Promisified openning websocket connection
 * @param ws
 */
const openConnectionPromisify = (ws: WebSocket) => {
    return new Promise((resolve, _) => {
        ws.on('open', () => {
            resolve();
        });
    })
};

export {
    openConnectionPromisify
}