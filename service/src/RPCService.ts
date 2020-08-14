import WebSocket from 'ws';
import { Server } from 'http';
import { ListenOptions } from 'net';

import { stringifyResponse } from '../helpers';

interface IClient {
    id?: number,
    ws: WebSocket,
}

interface IServices {
    [serviceName: string]: (params: object, client?: IClient, clients?: IClient[]) => {}
}

class RPCService {

    wss: WebSocket.Server;
    server: Server;
    clients: IClient[];
    services: IServices;

    constructor(server: Server) {
        this.clients = [];
        this.services = {};
        this.server = server;
        this.wss = new WebSocket.Server({ server });

        this.wss.on('connection', ws => {
            const client = { ws };

            this.clients.push(client);
            client.ws.on('message', (msg: string) => this.handleProcedure(msg, client));
        });
    }

    /**
     * Add new handlers for the RPC service.
     */
    addServices(services: IServices) {
        this.services = Object.assign(this.services, services);
    }

    /**
     * Handler matching
     */
    async handleProcedure(JSONRPC: string, client: { id?: number, ws: WebSocket }) {
        const data = JSON.parse(JSONRPC);

        const { id, method, params } = data;
        if (this.services && this.services[method]) {
            const result = await this.services[method].call(this, params, client, this.clients);

            const response = stringifyResponse(id, method, result);
            client.ws.send(response);
        }
    }

    /**
     * Start RPC Service
     */
    listen(options: ListenOptions) {
        this.server.listen(options);
    }
}

export {
    IClient,
    RPCService
}
