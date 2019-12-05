const { RichEmbed } = require("discord.js");
const { Colors } = require("../config");
const database = require("../util/database");

const triggers = [
	["add", "create", "append", "a"],
	["remove", "rmv", "delete", "del", "r", "d"],
	["set", "s", "affix", "fix", "f", "force"],
];

const banned = ["#", "@", "`"];

module.exports.run = (client, message, args, { guild }) => {
	const { prefix } = guild;

	let [mode = "list", newPrefix = null] = args;

	const pfx = `The prefix for this guild is \`${prefix}\``;

	const noargs = new RichEmbed()
		.setTitle("Prefixes")
		.setColor(Colors.DEFAULT)
		.setDescription([
			pfx, "",
			"To set the prefix, use the following command:",
			prefix + "prefix set <prefix>",
		])
		.setFooter(message.author.tag, message.author.displayAvatarURL);

	triggers.forEach(list => list.includes(mode) ? mode = list[0] : "ignore");

	if (!["set"].includes(mode)) return message.channel.send(noargs);

	if (mode === "set") {
		if (!newPrefix) return message.channel.send(
			new RichEmbed().setTitle("Prefix").setColor(Colors.FAILED).setDescription("Incorrect usage. You must provide a valid prefix to set.").setFooter(message.author.tag, message.author.displayAvatarURL)
		);
		if (banned.includes(newPrefix)) return message.channel.send(
			new RichEmbed().setTitle("Prefix").setColor(Colors.FAILED).setDescription("This prefix is unavailable. It may be a markdown character, or it was banned for another reason. Sorry!").setFooter(message.author.tag, message.author.displayAvatarURL)
		);
		if (newPrefix.length > 25) return message.channel.send(
			new RichEmbed().setTitle("Prefix").setColor(Colors.FAILED).setDescription("Prefixes are limited to 25 characters.").setFooter(message.author.tag, message.author.displayAvatarURL)
		);
		database.guilds.update(message.guild.id, { prefix: newPrefix });

		const setPrefix = new RichEmbed()
			.setTitle("Prefix")
			.setColor(Colors.SUCCESS)
			.setDescription("Successfully set the prefix to: `" + newPrefix + "`")
			.setFooter(message.author.tag, message.author.displayAvatarURL);

		return message.channel.send(setPrefix);
	}
};

module.exports.data = {
	name: "prefix",
	description: "View or set the server\"s prefix",
	type: "mod",
	restricted: true,
	usage: ["!prefix set <prefix>"],
	aliases: ["pfx", "pfxs", "prefixes", "guildprefix", "trigger", "triggers"],
};
