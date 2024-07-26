import { Client, Message, } from 'discord.js'
import { uniteds, error, success } from '../lib/utils'

module.exports = {
    name: 'ping',
    aliases: [],
    description: 'ajkasjkasjk',
    run: async (client: Client, message: Message) => {
        await success(message, `${client.ws.ping}ms`)
    }
}