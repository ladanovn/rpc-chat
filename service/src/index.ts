import env from 'dotenv';
import http from 'http';
// import WebSocket from 'ws';
import { RPCService } from './RPCService';

import {
    auth,
    sendMessage
} from './services';

env.config();

const httpServer = http.createServer();
const service = new RPCService(httpServer);

service.addServices({
    auth,
    sendMessage
});

service.listen({ port: 8000 });

// const ws = new WebSocket('ws://localhost:8000');
// ws.on('message', function incoming(data) {
//     console.log(data);
// });
// ws.on('open', function open() {
//     ws.send(JSON.stringify({
//         params: {}
//     }));
// });