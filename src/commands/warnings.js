const { RichEmbed } = require("discord.js");
const { Colors } = require("../config");
const moment = require("moment");

module.exports.run = async (client, message, args, { guild, user, error }) => {
	function format(id) {
		const getUser = client.users.get(id);
		return getUser ? getUser.tag : id;
	}

	try {
		const target = message.mentions.users.first();
		if (!target) return message.channel.send(
			new RichEmbed().setTitle("Warnings").setColor(Colors.FAILED).setDescription("Incorrect usage. You must mention a valid user.").setFooter(message.author.tag, message.author.displayAvatarURL)
		);

		const warnings = new Map(guild.warnings);

		const arr = warnings.get(target.id) || [];
		if (!arr.length) return message.channel.send(
			new RichEmbed().setTitle("Warnings").setColor(Colors.FAILED).setDescription("The mentioned user has no warnings.").setFooter(message.author.tag, message.author.displayAvatarURL)
		);

		const warnEmbed = new RichEmbed()
			.setTitle(`${target.tag}"s Warnings`)
			.setColor(Colors.DEFAULT)
			.setFooter(message.author.tag, message.author.displayAvatarURL)
			.setTimestamp();

		let totalPoints = 0;
		arr.forEach(w =>
			warnEmbed.addField(moment(w.date).format("MMMM Do YYYY, h:mm:ss a"), `Moderator: ${format(w.mod)}\nPoints: ${w.points || 0}\nReason: ${w.reason}`)
			totalPoints = totalPoints + w.points;
		);
		warnEmbed.addField("Total Points", totalPoints);

		message.channel.send(warnEmbed);
	}
	catch (e) {
		error(e.stack);
	}
};

module.exports.data = {
	name: "warnings",
	description: "View the mentioned user\"s warnings",
	type: "Administration",
	usage: ["!warnings <user>"],
	aliases: null,
};