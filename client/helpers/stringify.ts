import uniqid from 'uniqid';
import {
    IJSONRPCRequest,
    IJSONRPCResponse
} from '../../interfaces';

function stringifyRequest<Params>(method: string, params: Params, options?: {
    id: string,
}): string {
    const response: IJSONRPCRequest<Params> = {
        id: options ? options.id : uniqid(),
        jsonrpc: '2.0',
        method,
        params,
    };

    return JSON.stringify(response);
}

function stringifyResponse<Result>(idRequest: string, method: string, result: Result): string {
    const response: IJSONRPCResponse<Result> = {
        id: idRequest,
        jsonrpc: '2.0',
        method,
        result,
    };

    return JSON.stringify(response);
}

export {
    stringifyRequest,
    stringifyResponse
}