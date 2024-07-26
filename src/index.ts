import { Client, Collection } from 'discord.js'
import fs from 'fs'
import { config } from 'dotenv'
config();

interface myClient extends Client {
    commands: Collection<string, any>
}

const client = new Client({ intents: [3276799] }) as myClient;

client.commands = new Collection();

const commandFolder = fs.readdirSync('./dist/commands')

    for (const folder of commandFolder) {
        const commandFiles = fs.readdirSync(`./dist/commands/${folder}`)

        for (const file of commandFiles) {
            const command = require(`./commands/${folder}/${file}`)
            client.commands.set(command.name, command)
        }
    }

const eventFiles = fs.readdirSync('./dist/events')

    for (const file of eventFiles) {
        const event = require(`./events/${file}`)
        client.on(event.name, (...args) => event.run(client, ...args))
        console.log(`[$] Loaded Event: ${event.name}`)
    }

client.login(process.env.TOKEN)