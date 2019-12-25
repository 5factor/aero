const { RichEmbed } = require("discord.js");
const { Colors } = require("../config");
const database = require("../util/database");

module.exports.run = async (client, message, args, { error }) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(
        new RichEmbed().setTitle("Adminrole").setColor(Colors.FAILED).setDescription("This command is restricted to server administrators.").setFooter(message.author.tag, message.author.displayAvatarURL),
    );

    try {
        const newRole = message.guild.roles.find(c => c.name === args[0]);
        if (!newRole) return message.channel.send(
            new RichEmbed().setTitle("Adminrole").setColor(Colors.FAILED).setDescription("Incorrect usage. You must include a valid role name.").setFooter(message.author.tag, message.author.displayAvatarURL),
        );

        database.guilds.update(message.guild.id, { adminrole: (newRole.id) });
        const adminEmbed = new RichEmbed()
            .setTitle("Adminrole")
            .setColor(Colors.SUCCESS)
            .setDescription(`**Moderator**: ${message.author.tag}\n**Admin role**: ${newRole}`)
            .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp();
        message.channel.send(adminEmbed);
    } catch (e) {
        error(e.stack);
    }
};

module.exports.data = {
    name: "adminrole",
    description: "Sets the admin role",
    type: "mod",
    usage: ["!adminrole <role>"],
    aliases: null,
};