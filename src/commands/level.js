const { RichEmbed } = require("discord.js");
const { ensureLeveling } = require("../util/functions/ensureLeveling");
const { Colors } = require("../config");

module.exports.run = async (client, message, args, { guild, user, error }) => {
	try {
		if (guild.levelingactive == false) return;

		const leveling = new Map(guild.leveling);
		const userLevel = leveling.get(message.author.id) || ensureLeveling(guild, user);

		const embed = new RichEmbed()
			.setTitle(message.author.tag + "\"s Profile")
			.setColor(Colors.DEFAULT)
			.addField("XP", userLevel.xp + "/" + Math.floor(userLevel.lastXP))
			.addField("Level", userLevel.level);

		message.channel.send(embed);
	}
	catch (e) {
		error(e.stack);
	}
};

module.exports.data = {
	name: "level",
	description: "Check your current level",
	type: "fun",
	usage: ["!level"],
	aliases: ["profile"],
};