import WebSocket from 'ws';
import uniqid from 'uniqid';
import { stringifyRequest } from '../helpers';

import {
    IAuthParams,
    IAuthResult,
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
            resolve: (data: IJSONRPCResponse<object>) => {},
            reject: (data: IJSONRPCError) => {},
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
                this.pendingRequests[responseId].resolve(response);

            } else {
                // If response return error
                this.pendingRequests[responseId].reject(response);
            }

            delete this.pendingRequests[responseId];
        }
    }

    async connect() {
        return new Promise((resolve, reject) => {
            this.ws.on('open', () => {
                resolve();
            });
        })
    }

    async auth(params: IAuthParams): Promise<IAuthResult> {
        const id = uniqid();
        const request = stringifyRequest<IAuthParams>('auth', params, {
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
}

export {
    RPCClient,
}
