import { RPCClient } from './RPCClient';

(async () => {
    const client = new RPCClient('ws://localhost:8000');
    await client.connect();
    
    const response = await client.auth({
        login: 'test',
        passwort: 'test'
    });

    console.log(response);
})();