import WebSocket from 'ws';
import uniqid from 'uniqid';
import {
    stringifyRequest,
    openConnectionPromisify
} from '../helpers';

import {
    IConnectParams,
    IConnectResult,
    ISendMessageParams,
    ISendMessageResult,
    IJSONRPCRequest,
    IJSONRPCResponse,
    IJSONRPCError,
} from '../../interfaces';
import { resolve } from 'path';

class RPCClient {
    id: number;
    ws: WebSocket;
    url: string;
    pendingRequests: {
        [id: string]: {
            resolve: (data: object) => {},
            reject: (data: object) => {},
        }
    };

    constructor(url: string) {
        this.url = url;
        this.ws = new WebSocket(url);
        this.pendingRequests = {};

        this.ws.on('message', (msg: string) => {
            const data = JSON.parse(msg);

            // if message is response of previous request
            if (data.result) {
                this.responseHandler(data);
            }
        });
    }

    async responseHandler(response: IJSONRPCResponse<object> | IJSONRPCError) {
        const responseId = response.id;

        if (this.pendingRequests[responseId]) {

            // Check is success response
            if ('result' in response) {
                const result = (response as IJSONRPCResponse<object>).result;
                this.pendingRequests[responseId].resolve(result);

            } else {
                // If response return error
                const error = (response as IJSONRPCError).error;
                this.pendingRequests[responseId].resolve(error);
            }

            delete this.pendingRequests[responseId];
        }
    }

    async connect(params?: IConnectParams): Promise<IConnectResult> {
        await openConnectionPromisify(this.ws);
        return await this._connect(params);
    }

    async sendMessage(params: ISendMessageParams): Promise<ISendMessageResult> {
        const id = uniqid();
        const request = stringifyRequest<ISendMessageParams>('sendMessage', params, {
            id,
        });

        this.ws.send(request);
        return new Promise((resolve, reject) => {
            this.pendingRequests[id] = {
                resolve: (resolve as any),
                reject: (reject as any)
            }
        });
    }

    private async _connect(params: IConnectParams): Promise<IConnectResult> {
        const id = uniqid();
        const request = stringifyRequest<IConnectParams>('connect', params, {
            id,
        });

        this.ws.send(request);
        return new Promise((resolve, reject) => {
            this.pendingRequests[id] = {
                resolve: (resolve as any),
                reject: (reject as any)
            }
        });
    }
}

export {
    RPCClient,
}
