import { Client, Collection, EmbedBuilder, Message } from "discord.js";
import { error, success } from "../lib/utils";

module.exports = {
  name: "clear",
  aliases: ["c"],
  description: "Clear messages from the channel or a specific user.",
  run: async (client: Client, message: Message, args: string[]) => {
    const user = message.mentions.users.first();
    try {
        if (!user) {
            if(args[0] === 'bots') { 
                const fetchedMessages = await message.channel.messages.fetch({ limit: 100 })

                const messages = Array.from(fetchedMessages.values()).filter(msg => msg.author.bot)

                for (const msg of messages) {
                    await message.channel.sendTyping()
                    await msg.delete();
                }
                await success(message, `${message.author}: purged ${messages.length} from bots`)
            } else {
                const amount = Number(args[0]);
      
            if (!Number(amount))
              return error(
                message,
                "The argument you provided isn't a valid number!"
              );
      
            if (amount <= 0 || amount >= 100)
              return error(message, "Enter an amount less than 100!");
      
            const fetchedMessages = await message.channel.messages.fetch({
              limit: amount,
            });
            const messages = Array.from(fetchedMessages.values());
      
            for (const msg of messages) {
              await message.channel.sendTyping();
              await msg.delete();
            }
      
            await success(
              message,
              `${message.author}: purged ${messages.length} messages.`
            );
            }
          } else {
            const fetchedMessages = await message.channel.messages.fetch({
              limit: 100,
            });
            const messages = Array.from(fetchedMessages.values()).filter(
              (msg) => msg.author.id === user.id
            );
      
            for (const msg of messages) {
              await message.channel.sendTyping();
              await msg.delete();
            }
      
            await success(
              message,
              `${message.author}: purged ${messages.length} messages from ${user}.`
            );
          }
    } catch (err) {
        await error(message, `${(err as Error).message}`)
    }
  },
};
