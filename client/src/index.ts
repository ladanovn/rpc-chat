import { RPCClient } from './RPCClient';
import { MessageInterface } from './MessagerInterface';
import { IGetMessageParams } from '../../interfaces'

(async () => {
    // TODO:
    // - remove protocol for connection
    // - default url to .env
    const client = new RPCClient('ws://localhost:8000');
    const { id } = await client.connect();

    const messangeInterface = new MessageInterface(id);

    client.addHandlers({
        getMessage: (data: IGetMessageParams) => {
            messangeInterface.addMessage({
                ...data,
                timestamp: new Date(data.timestamp)
            });
            messangeInterface.updateInterface();
        }
    })

    const stdin = process.openStdin();
    stdin.addListener("data", async data => {
        const [text, receiver] = data.toString().trim().split(" ");

        messangeInterface.addMessage({
            sender: id,
            receiver: receiver ? receiver : -1,
            text,
            timestamp: new Date()
        });
        messangeInterface.updateInterface();

        await client.sendMessage({
            text,
            receiver: Number(receiver) ? Number(receiver) : -1,
        })
    });
})();