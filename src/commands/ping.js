const { RichEmbed } = require('discord.js');
const { Colors } = require('../config');

module.exports.run = async (_client, message) => {
	const m = await message.channel.send('Loading...');

	const embed = new RichEmbed()
		.setTitle('Latency')
		.setColor(Colors.DEFAULT)
		.setDescription(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`)
		.setFooter(message.author.tag, message.author.displayAvatarURL);

	return m.edit(embed);
};

module.exports.data = {
	name: 'ping',
	hide: true,
	aliases: null,
};
