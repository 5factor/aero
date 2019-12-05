const { RichEmbed } = require("discord.js");
const { Colors } = require("../config");

module.exports.run = async (client, message, args, { error }) => {
	try {
		let amount = parseInt(args[0]);

		if(!amount) return message.channel.send(
			new RichEmbed().setTitle("Clear").setColor(Colors.FAILED).setDescription("You must include a valid amount of messages to clear.").setFooter(message.author.tag, message.author.displayAvatarURL)
		);
		if(amount >= 100) amount = 99;
		if(amount <= 0) return message.channel.send(
			new RichEmbed().setTitle("Clear").setColor(Colors.FAILED).setDescription("You must include an amount above 0 to clear.").setFooter(message.author.tag, message.author.displayAvatarURL)
		);

		await message.channel.bulkDelete(parseInt(amount) + 1);
	}
	catch (e) {
		error(e.stack);
		console.log(e.stack);
	}
};

module.exports.data = {
	name: "clear",
	description: "Bulk deletes the specified amount of messages",
	type: "mod",
	usage: ["!clear <amount> [@user]"],
	aliases: ["purge"],
};