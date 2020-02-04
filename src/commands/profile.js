const { RichEmbed } = require("discord.js");
const { fuzzy } = require("../util/packages/Functions");
const { Colors } = require("../config");

module.exports.run = async (client, message, args, { guild, user, error }) => {
    try {
        let targetMember = message.mentions.members.first();

        if (!targetMember) {
            targetMember = message.guild.members.find(m => fuzzy(args[0], m.user.tag.toLowerCase() + "~>" + m.id)) || message.member;
        }

        const leveling = new Map(guild.leveling);
        const userLevel = leveling.get(targetMember.id) || { level: 1, xp: 0, lastXP: 175 };

        const embed = new RichEmbed()
            .setTitle("Profile")
            .setColor(Colors.DEFAULT)
            .setThumbnail(targetMember.user.displayAvatarURL)
            .addField("Information", `**Username:** ${targetMember.user.tag}\n**Nickname:** ${targetMember.displayName}\n**ID:** ${targetMember.id}\n**Account Creation:** ${targetMember.user.createdAt}\n**Joined Server:** ${targetMember.joinedAt}`)
            .addField("Leveling", `**Level:** ${userLevel.level}\n**XP:** ${userLevel.xp}/${Math.floor(userLevel.lastXP)}`);

        message.channel.send(embed);
    } catch (e) {
        error(e.stack);
    }
};

module.exports.data = {
    name: "profile",
    description: "Check yours or the specified users profile",
    type: "fun",
    usage: ["!profile [user]"],
    aliases: ["level", "userinfo"],
};