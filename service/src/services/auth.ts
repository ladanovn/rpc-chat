import { IClient } from '../RPCService';
import {
    IAuthParams,
    IAuthResult
} from '../../../interfaces';

export function auth(
    param: IAuthParams,
    client: IClient,
    clients: IClient[]
): IAuthResult {

    const id = clients.length;
    client.id = id;

    return {
        id
    }
}