import { Client, EmbedBuilder, Message } from "discord.js";

module.exports = {
  name: "avatar",
  aliases: ["av", "pfp"],
  description: "asdasd",
  run: async (client: Client, message: Message, args: string[]) => {
    let user = message.mentions.users.first() || client.users.cache.find(u => u.id === args[0] || u.username === args[0]) || message.author;

    const embed = new EmbedBuilder()

    .setTitle(`Avatar of ${user.username}`)
    .setImage(user.displayAvatarURL({ forceStatic: true, size: 4096 }))
    .setColor('#f5f4f4')
    .setTimestamp()

    await message.reply({ embeds: [embed] })
  },
};
