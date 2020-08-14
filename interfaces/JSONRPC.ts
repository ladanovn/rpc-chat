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

interface IJSONRPCError {
    id: string,
    jsonrpc: string,
    method: string,
    error: {
        code?: string,
        message: string,
    }
}

export {
    IJSONRPCRequest,
    IJSONRPCResponse,
    IJSONRPCError,
}