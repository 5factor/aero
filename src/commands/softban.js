
const { RichEmbed } = require("discord.js");
const { Colors } = require("../config");

module.exports.run = async (client, message, args, { guild, user, error }) => {
    const memberMention = message.mentions.members.first();
    const reason = args.slice(1).join(" ") || "None provided";
    if (!memberMention) return message.channel.send(
        new RichEmbed().setTitle("Softban").setColor(Colors.FAILED).setDescription("Incorrect usage. You must mention a valid user.").setFooter(message.author.tag, message.author.displayAvatarURL),
    );

    if (!memberMention.bannable) return message.channel.send(
        new RichEmbed().setTitle("Softban").setColor(Colors.FAILED).setDescription("I cannot softban the mentioned user. Make sure the Aero role is above the other roles.").setFooter(message.author.tag, message.author.displayAvatarURL),
    );

    await memberMention.ban({ days: 7, reason: reason })
        .catch(err => {
            console.error(err);
            error(err);
        });

    const makeEmbed = new RichEmbed()
        .setTitle("Softban")
        .setDescription(`Successfully softbanned ${memberMention.user.tag} from the server!`)
        .addField("Moderator", `${message.author.tag} (${message.author.id})`)
        .addField("Reason", reason)
        .setTimestamp();

    message.channel.send(makeEmbed);

};

module.exports.data = {
    name: "softban",
    description: "Bans the specified user for 7 days",
    type: "mod",
    usage: ["!softban <user> [reason]"],
    aliases: null,
};