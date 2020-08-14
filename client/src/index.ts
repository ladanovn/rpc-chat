import { RPCClient } from './RPCClient';

(async () => {
    const client = new RPCClient('ws://localhost:8000');
    const { id } = await client.connect();

    console.log(`Client identificator: ${id}`);

    // example
    client.addHandlers({
        getMessage: data => {
            console.log(data);
        }
    })

    const stdin = process.openStdin();
    stdin.addListener("data", async data => {
        const [text, receiver] = data.toString().trim().split(" ");
        await client.sendMessage({
            text,
            receiver: Number(receiver) ? Number(receiver) : -1,
        })
    });
})();