const { RichEmbed } = require("discord.js");
const { Colors } = require("../config");
const database = require("../util/database");

module.exports.run = async (client, message, args, { guild, error }) => {
    try {
        const allowed = ["kick", "ban"];

        const pointAmount = parseInt(args[0]);
        const modAction = args[1];

        if (!pointAmount || !allowed.includes(modAction.toLowerCase())) return message.channel.send(
            new RichEmbed().setTitle("Automated Moderation").setColor(Colors.FAILED).setDescription("Incorrect usage. You must include a valid amount of points and a valid action (kick, ban, softban).").setFooter(message.author.tag, message.author.displayAvatarURL),
        );

        const newArr = new Map(guild.moderation);
        newArr[modAction.toLowerCase()] = pointAmount;
        database.guilds.update(message.guild.id, { moderation: Array.from(newArr) });

        const filterEmbed = new RichEmbed()
            .setTitle("Automated Moderation")
            .setColor(Colors.SUCCESS)
            .setDescription(`**Moderator**: ${message.author.tag}\n**Points** ${pointAmount}\n**Action**: ${modAction}`)
            .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp();

        message.channel.send(filterEmbed);

    } catch (e) {
        error(e.stack);
    }
};

module.exports.data = {
    name: "setmoderation",
    description: "Set an automated moderation action for when a user hits a certain amount of points",
    type: "mod",
    usage: ["!setmoderation <pointsAmount> <kick/ban>"],
    aliases: null,
};
