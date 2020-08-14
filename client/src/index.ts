import { RPCClient } from './RPCClient';

(async () => {
    const client = new RPCClient('ws://localhost:8000');

    const response = await client.connect();
    console.log(response);

    const response2 = await client.sendMessage({
        receiver: -1,
        text: 'test'
    });
    console.log(response2);
})();