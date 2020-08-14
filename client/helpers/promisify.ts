import WebSocket from 'ws';

const openConnectionPromisify = (ws: WebSocket) => {
    return new Promise((resolve, reject) => {
        ws.on('open', () => {
            resolve();
        });
    })
};

export {
    openConnectionPromisify
}