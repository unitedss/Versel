import { Client, Message, AttachmentBuilder } from 'discord.js'
import { launch } from "puppeteer"
import { error } from '../lib/utils'

module.exports = {
    name: 'screenshot',
    aliases: ['ss'],
    description: 'asfdjkaksf,d',
    run: async (client: Client, message: Message, args: string[]) => {
        
        let url = args[0]
        if(!url) return error(message, 'You forgot to put the url of the web page to take screenshot!')

        const browser = await launch();
        const page = await browser.newPage();
        url = url.substring(0, 8) === 'https://' ? url : url.replace(url, `https://${url}`)
        try {
            await message.channel.sendTyping();
            await page.goto(url)
            const ss = await page.screenshot();
            await browser.close()

            const img = new AttachmentBuilder(ss, { name: 'screenshot.png'})
            await message.channel.send({ files: [img] })
        } catch (err) {
            await error(message, `${(err as Error).message}`)
        }
    }
}