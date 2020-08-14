import { IClient } from '../RPCService';
import {
    IConnectParams
} from '../../../interfaces';

let clientIDGenerator = 0;

export function connect(
    param: IConnectParams,
    client: IClient,
    clients: IClient[]
): IConnectParams {
    const id = clientIDGenerator++
    client.id = id;

    return {
        id
    }
}