import { Client, Message, Events, Collection } from 'discord.js'
import { config } from 'dotenv'
config();

interface myClient extends Client {
    commands: Collection<string, any>;
}

const client = new Client({ intents: [3276799] }) as myClient;

module.exports = {
    name: Events.MessageCreate,
    async run(client: myClient, message: Message) {

        if(message.author.bot) return;

        const prefix = ',';

        if(!message.content.startsWith(prefix)) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const command = args.shift()?.toLowerCase();
        const cmd = client.commands.find(c => c.name === command || c.aliases && c.aliases.includes(command))
        if(cmd) {
            return cmd.run(client, message, args)
        }

    }
}