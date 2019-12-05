const { RichEmbed } = require("discord.js");
const { Colors } = require("../config");
const database = require("../util/database");

module.exports.run = async (client, message, args, { guild, error }) => {
	try {
		const target = message.mentions.users.first();
		if (!target) return message.channel.send(
			new RichEmbed().setTitle("Warn").setColor(Colors.FAILED).setDescription("Incorrect usage. You must mention a valid user.").setFooter(message.author.tag, message.author.displayAvatarURL)
		);

		const warnings = new Map(guild.warnings);

		const arr = warnings.get(target.id) || [];
		if (!arr.length) return message.channel.send(
			new RichEmbed().setTitle("Warn").setColor(Colors.FAILED).setDescription("The mentioned user has no warnings.").setFooter(message.author.tag, message.author.displayAvatarURL)
		);

		warnings.set(target.id, []);

		database.guilds.update(message.guild.id, { warnings: Array.from(warnings) });

		const warnEmbed = new RichEmbed()
			.setTitle("Clearwarns")
			.setColor(Colors.SUCCESS)
			.setDescription(`**Moderator**: ${message.author.tag}\n**Target**: ${target.tag}\n**Action**: Cleared warnings`)
			.setFooter(message.author.tag, message.author.displayAvatarURL)
			.setTimestamp();

		message.channel.send(warnEmbed);
	}
	catch (e) {
		error(e.stack);
	}
};

module.exports.data = {
	name: "removewarns",
	description: "Removes the mentioned user's warnings",
	type: "mod",
	usage: ["!clearwarns <user>"],
	aliases: ["removewarns"],
};