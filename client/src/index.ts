import env from 'dotenv';
import { RPCClient } from './RPCClient';
import { MessageInterface } from './MessagerInterface';
import { IGetMessageParams } from '../../interfaces'

env.config();

const {
    SERVICE_URL
} = process.env;

(async () => {
    const client = new RPCClient(SERVICE_URL);
    const { id } = await client.connect();

    const messangeInterface = new MessageInterface(id);

    // added handlers for incoming message
    client.addHandlers({
        getMessage: (data: IGetMessageParams) => {
            messangeInterface.addMessage({
                ...data,
                timestamp: new Date(data.timestamp)
            });
            messangeInterface.updateInterface();
        }
    });

    const stdin = process.openStdin();
    stdin.addListener("data", async data => {
        const formatedData = data.toString().trim();
        const separatorIndex = formatedData.indexOf(" ");

        const receiver = Number(formatedData.slice(0, separatorIndex));
        const text = formatedData.slice(separatorIndex);

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