const { RichEmbed } = require("discord.js");
const { Colors } = require("../config");

module.exports.run = (client, message, args, { guild }) => {

	const embed = new RichEmbed()
		.setTitle("About")
		.setColor(Colors.DEFAULT)
		.addField("About", "Aero is a multipurpose bot that is perfect for any server. The bot contains all the tools you need for moderation and fun.")
		.addField("Stats", `**Users:** ${client.users.size}\n**Servers:** ${client.guilds.size}\n**Prefix:** ${guild.prefix}`)
		.addField("Invite the Bot", "You can invite the bot using the [Invite Link](https://myaerobot.com/bot-invite)")
		.setFooter(message.author.tag, message.author.displayAvatarURL);

	message.channel.send(embed);
};

module.exports.data = {
	name: "about",
	description: "View some bot statistics.",
	type: "misc",
	usage: ["!about"],
	aliases: ["info", "invite"],
};
