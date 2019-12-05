const { RichEmbed } = require("discord.js");
const { Logging } = require("../config");
const { runCommand, initDB, filterString, ensureLeveling, updateLeveling } = require("../util/packages/Functions");

module.exports = async (client, message) => {
	if (message.author.bot) return;
	if (!message.guild) return client.channels.get(Logging.SUPPORT).send(`**${message.author.tag} (${message.author.id}):**\n${message.content}`);

	let [user, guild] = await initDB(message);
	filterString(message, guild);
	[user, guild] = await ensureLeveling(user, guild);

	const prefixes = [`<@${client.user.id}>`, `<@!${client.user.id}>`].concat(guild.prefix);
	let prefix = false;
	for (const p of prefixes) message.content.startsWith(p) ? prefix = p : null;
	if (!prefix) return [user, guild] = await updateLeveling(user, guild, message);

	const args = message.content.slice(prefix.length).trim().split(" ");

	function error(text) {
		const embed = new RichEmbed()
			.setTitle("An error has occured")
			.addField("Information", text);
		return client.channels.get(Logging.LOG_CHANNEL).send(embed);
	}

	runCommand(client, message, args, { guild, user, error });
};
