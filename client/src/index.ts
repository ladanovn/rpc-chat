import { RPCClient } from './RPCClient';

(async () => {
    const client = new RPCClient('ws://localhost:8000');

    // example
    // client.addHandlers({
    //     getMessage: (data) => {
    //         console.log('new message')
    //         console.log(data);
    //     }
    // })
    // const response = await client.connect();
    // console.log(response);

    // const response2 = await client.sendMessage({
    //     receiver: -1,
    //     text: 'test'
    // });
    // console.log(response2);
})();