const { RichEmbed } = require('discord.js');
const { Colors } = require('../config');
const database = require('../util/database');

module.exports.run = async (client, message, args, { guild, user, error }) => {
	try {
		const type = args[0];
		const allowedTypes = ['enable', 'disable'];

		if (!allowedTypes.includes(type)) return message.channel.send(
			new RichEmbed().setTitle('Link Filter').setColor(Colors.FAILED).setDescription('Incorrect usage. You must use a valid keyword (`enable`, `disable`).').setFooter(message.author.tag, message.author.displayAvatarURL)
		);

		if (type === 'enable') {
			database.guilds.update(message.guild.id, { linkfilter: true });
			return message.channel.send(
				new RichEmbed().setTitle('Link Filter').setColor(Colors.SUCCESS).setDescription(`**Moderator**: ${message.author.tag}\n**Set to**: Enabled`).setFooter(message.author.tag, message.author.displayAvatarURL).setTimestamp()
			);
		}

		if (type === 'disable') {
			database.guilds.update(message.guild.id, { linkfilter: false });
			return message.channel.send(
				new RichEmbed().setTitle('Link Filter').setColor(Colors.SUCCESS).setDescription(`**Moderator**: ${message.author.tag}\n**Set to**: Disabled`).setFooter(message.author.tag, message.author.displayAvatarURL).setTimestamp()
			);
		}
	}
	catch (e) {
		error(e.stack);
	}
};

module.exports.data = {
	name: 'linkfilter',
	description: 'Enable/disable the link filter',
	type: 'mod',
	usage: ['!linkfilter <enable/disable>'],
	aliases: null,
};