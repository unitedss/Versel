import { Client, Events} from 'discord.js'
const client: Client = new Client({ intents: [3276799] })

module.exports = {
    name: Events.ClientReady,
    async run(client: Client) {
        console.log(`Logged in as: ${client.user?.tag}`)
    }
}