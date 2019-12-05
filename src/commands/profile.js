const { RichEmbed } = require("discord.js");
const { ensureLeveling } = require("../util/functions/ensureLeveling");
const { Colors } = require("../config");
const Fuzzy = require("../util/Fuzzy");

module.exports.run = async (client, message, args, { guild, user, error }) => {
	try {
		if (guild.levelingactive == false) return;

		const targetMember = message.guild.members.find(m => Fuzzy(args[0], m.user.tag.toLowerCase() + "~>" + m.id)) || message.member;
		const leveling = new Map(guild.leveling);
		const userLevel = leveling.get(targetMember.id) || { level: 1, xp: 0, lastXP: 175 };

		const embed = new RichEmbed()
			.setTitle("Profile")
			.setColor(Colors.DEFAULT)
			.setThumbnail(targetMember.user.displayAvatarURL)
			.addField("Information", `**Username:** ${targetMember.user.tag}\n**Nickname:** ${targetMember.displayName}\n**ID:** ${targetMember.id}\n**Account Creation:** ${targetMember.user.createdAt}\n**Joined Server:** ${targetMember.joinedAt}`)
			.addField("Leveling", `**Level:** ${userLevel.level}\n**XP:** ${userLevel.xp}/${Math.floor(userLevel.lastXP)}`);

		message.channel.send(embed);
	}
	catch (e) {
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