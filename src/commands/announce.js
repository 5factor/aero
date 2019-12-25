const { RichEmbed } = require("discord.js");
const { Colors } = require("../config");

module.exports.run = async (client, message, args, { guild }) => {

    if (!args.length) return message.channel.send(
        new RichEmbed().setTitle("Announce").setColor(Colors.FAILED).setDescription("You must include a valid title and description").setFooter(message.author.tag, message.author.displayAvatarURL),
    );

    const data = args.join(" ").split(/(\||;)/).map(i => i.trim());
    const m = await message.channel.send("Proccessing...");

    const title = data[0];
    const desc = data[2];
    const annchannel = message.guild.channels.find(channel => channel.name === data[4]);
    if (!title || !desc || !annchannel) return m.edit(new RichEmbed().setTitle("Announce").setColor(Colors.FAILED).setDescription(`Incorrect usage. Run \`${guild.prefix}help announce\` for usage.`).setFooter(message.author.tag, message.author.displayAvatarURL));

    const ann = new RichEmbed()
        .setTitle(title)
        .setDescription(desc)
        .setFooter(`Announced by ${message.author.tag}`)
        .setColor(Colors.DEFAULT);

    const done = new RichEmbed()
        .setTitle("Announce")
        .setDescription("Your message has successfully been announced!")
        .setColor(Colors.SUCCESS)
        .setFooter(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp;

    annchannel.send(ann);
    m.edit(done);
};

module.exports.data = {
    name: "announce",
    description: "Send an announcement in the form of an embed",
    type: "mod",
    usage: ["!announce <title>|<description>|<channelname>"],
    aliases: ["ann"],
};