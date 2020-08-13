import uniqid from 'uniqid';

interface IJSONRPCRequest<Params> {
    id: string,
    jsonrpc: string,
    method: string,
    params: Params
}

interface IJSONRPCResponse<Result> {
    id: string,
    jsonrpc: string,
    method: string,
    result: Result
}

function stringifyRequest<Params>(method: string, params: Params): string {
    const response: IJSONRPCRequest<Params> = {
        id: uniqid(),
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
    IJSONRPCRequest,
    IJSONRPCResponse,
    stringifyRequest,
    stringifyResponse
}