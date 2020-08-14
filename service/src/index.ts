import env from 'dotenv';
import http from 'http';
import { RPCService } from './RPCService';

import {
    connect,
    sendMessage
} from './services';

env.config();

const SERVICE_PORT = Number(process.env.SERVICE_PORT);

const httpServer = http.createServer();
const service = new RPCService(httpServer);

service.addServices({
    connect,
    sendMessage
});

const address = service.listen({ port: SERVICE_PORT });
console.log(`Ready on ${SERVICE_PORT} port`);