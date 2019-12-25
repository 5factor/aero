const { RichEmbed } = require("discord.js");
const { Colors } = require("../config");
const database = require("../util/database");

module.exports.run = async (client, message, args, { guild, error }) => {
    try {
        const newRole = message.guild.roles.find(c => c.name === args[0]);
        if (!newRole) return message.channel.send(
            new RichEmbed().setTitle("Modrole").setColor(Colors.FAILED).setDescription("Incorrect usage. You must include a valid role name.").setFooter(message.author.tag, message.author.displayAvatarURL),
        );

        database.guilds.update(message.guild.id, { modrole: (newRole.id) });
        const adminEmbed = new RichEmbed()
            .setTitle("Adminrole")
            .setColor(Colors.SUCCESS)
            .setDescription(`**Moderator**: ${message.author.tag}\n**Mod role**: ${newRole}`)
            .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp();
        message.channel.send(adminEmbed);
    } catch (e) {
        error(e.stack);
    }
};

module.exports.data = {
    name: "modrole",
    description: "Sets the moderator role",
    type: "mod",
    restricted: true,
    usage: ["!modrole <role>"],
    aliases: null,
};