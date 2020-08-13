import { IClient } from '../RPCService';
import { stringifyRequest } from '../helpers';
import {
    ISendMessageParams,
    ISendMessageResult,
    IGetMessageParams,
} from '../../../interfaces';

export function sendMessage(
    param: ISendMessageParams,
    client: IClient,
    clients: IClient[]
): ISendMessageResult {

    if (param.receiver === -1) {
        // Broadcast message
        clients.forEach(receiver => {
            if (receiver.ws !== client.ws) {
                const request = stringifyRequest<IGetMessageParams>('getMessage', {
                    text: param.text,
                    sender: client.id,
                    timestamp: new (Date)(),
                });
                receiver.ws.send(request);
            }
        });

    } else {
        // Send message to specified client
        const receiver = clients.find(client => client.id === param.receiver);
        if (receiver) {
            const request = stringifyRequest<IGetMessageParams>('getMessage', {
                text: param.text,
                sender: client.id,
                timestamp: new (Date)(),
            });
            receiver.ws.send(request);
        }
    }

    return {
        status: 'OK'
    }
}