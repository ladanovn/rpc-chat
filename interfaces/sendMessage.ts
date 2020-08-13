interface ISendMessageParams {
    receiver: number,
    text: string
}

interface ISendMessageResult {
    status: string,
}

export {
    ISendMessageParams,
    ISendMessageResult,
}