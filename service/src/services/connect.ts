import { IClient } from '../RPCService';
import {
    IConnectParams
} from '../../../interfaces';

let clientIDGenerator = 1;

/**
 * Service for assigning identifiers to clients
 * @param param
 * @param client
 */
export function connect(
    param: IConnectParams,
    client: IClient
): IConnectParams {
    const id = clientIDGenerator++
    client.id = id;

    return {
        id
    }
}