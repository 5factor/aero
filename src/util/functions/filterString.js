const { RichEmbed } = require("discord.js");
const { Colors } = require("../../config");

module.exports = async (message, guild) => {
    const { adminrole, modrole, wordblacklist, wordblacklistactive } = guild;

    if (message.member.roles.has(modrole) || message.member.roles.has(adminrole) || message.member.hasPermission("ADMINISTRATOR")) return;

    const content = message.content.toLowerCase();
    if (wordblacklistactive && content.split(" ").some(a => wordblacklist.includes(a))) {
        const embed = new RichEmbed()
            .setTitle("Bad word detected")
            .setColor(Colors.FAILED)
            .setDescription("Uh oh, we detected a word in your message that has been blacklisted in this server.")
            .setFooter(message.author.tag, message.author.displayAvatarURL);
        message.channel.send(embed);
        message.delete();
    }
};