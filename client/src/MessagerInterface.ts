interface IMessage {
    sender: number,
    receiver: number,
    text: string,
    timestamp: Date
}

class MessageInterface {
    clientId: number;
    msgHistory: {
        sender: number,
        receiver: number,
        text: string,
        timestamp: Date
    }[] = [];

    constructor(clientId: number) {
        this.clientId = clientId;
        this.msgHistory = [];

        this.updateInterface();
    }

    /**
     * Add message to log
     * @param msg
     */
    addMessage(msg: IMessage) {
        this.msgHistory.push(msg);
    }

    /**
     * Rerender console interface
     */
    updateInterface() {
        console.clear();
        console.log(`Your ID: ${this.clientId}`);
        console.log('Message history:');
        console.log('...');
        this.msgHistory.slice(-10).forEach(msg => {
            console.log(
                `[${msg.timestamp.toLocaleTimeString()}][${msg.sender}->${msg.receiver}]: ${msg.text}`
            )
        });
    }

}

export {
    IMessage,
    MessageInterface
}