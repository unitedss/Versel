import { Embed, EmbedBuilder, Message } from "discord.js";

export const error = (message: Message, msg: string) => {
  message.reply({
    embeds: [new EmbedBuilder().setDescription(msg).setColor("#FF0000")],
  });
};

export const success = async (message: Message, msg: string) => {
  message.channel.send({
    embeds: [
      new EmbedBuilder()
        .setAuthor({
          name: message.author.username,
          iconURL: message.author.displayAvatarURL({ forceStatic: true }),
        })
        .setDescription(msg)
        .setColor("#f5f4f4"),
    ],
  });
};

export const uniteds = "885638389725036654";
