const { RichEmbed } = require("discord.js");
const { Colors } = require("../config");

module.exports.run = async (client, message, args, { guild, user, error }) => {
    const memberMention = message.mentions.members.first();
    if (!memberMention) return message.channel.send(
        new RichEmbed().setTitle("Unmute").setColor(Colors.FAILED).setDescription("You must include a valid user.").setFooter(message.author.tag, message.author.displayAvatarURL),
    );

    const getRole = message.guild.roles.find(role => role.name === "Muted");
    if (!getRole) return message.channel.send(
        new RichEmbed().setTitle("Unmute").setColor(Colors.FAILED).setDescription("The specified user is not muted. Run the `mute` command to mute.").setFooter(message.author.tag, message.author.displayAvatarURL),
    );
    if (!memberMention.roles.has(getRole.id)) return message.channel.send(
        new RichEmbed().setTitle("Unmute").setColor(Colors.FAILED).setDescription("The specified user is not muted. Run the `mute` command to mute.").setFooter(message.author.tag, message.author.displayAvatarURL),
    );
    memberMention.removeRole(getRole.id).then(() => {
        const embed = new RichEmbed()
            .setTitle("Unmute")
            .setColor(Colors.SUCCESS)
            .setDescription(`Successfully unmuted ${memberMention.user.tag}.`)
            .addField("Moderator", message.author.tag)
            .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp();

        message.channel.send(embed);
    }).catch((e) => {
        message.reply("Failed to remove the muted role, ensure I have the `MANAGE_ROLES` permission and that I am ranked above the mentioned user!");
        error(e);
    });
};

module.exports.data = {
    name: "unmute",
    description: "Unmutes the specified user",
    type: "mod",
    usage: ["!mute <user>"],
    aliases: null,
};