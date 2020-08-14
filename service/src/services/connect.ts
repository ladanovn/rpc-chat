import { IClient } from '../RPCService';
import {
    IConnectParams,
    IConnectResult
} from '../../../interfaces';

export function connect(
    param: IConnectParams,
    client: IClient,
    clients: IClient[]
): IConnectParams {
    const id = clients.length;
    client.id = id;

    return {
        id
    }
}