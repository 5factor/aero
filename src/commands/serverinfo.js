const { RichEmbed } = require('discord.js');
const { Colors } = require('../config');
const { Util } = require('discord.js');
const moment = require('moment');

module.exports.run = async (client, message, args, { guild, user, error }) => {
	const { prefix } = guild;

	let emotes;
	let maxEmotes;

	await message.guild.fetchMembers();

	if (message.guild.emojis.size > 1) {
		emotes = message.guild.emojis.map(e=>e.toString()).join('');
		maxEmotes = Util.splitMessage(emotes, { maxLength: 1000, char: '>', append: '>' });
	}
	else {
		emotes = 'None';
	}

	const embed = new RichEmbed()
		.setTitle('Server Information')
		.setColor(Colors.DEFAULT)
		.addField('Server Details', `**Name:** ${message.guild.name}\n**ID:** ${message.guild.id}\n**Owner:** ${message.guild.owner}\n**Region:** ${message.guild.region}\n**Creation date:** ${moment(message.guild.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`)
		.addField('Server Statistics', `**Member count:** ${message.guild.memberCount}\n**Channel count:** ${message.guild.channels.size}`);
	if (emotes.length < 1000) {
		embed.addField('Miscellaneous', `**Prefix:** \`${prefix}\`\n**Emotes:**\n${emotes}`);
	}
	else if (emotes.length > 1000) {
		embed.addField('Miscellaneous', `**Prefix:** \`${prefix}\`\n**Emotes:**\n${maxEmotes[0]}`);
	}

	message.channel.send(embed);
};

module.exports.data = {
	name: 'serverinfo',
	description: 'Sends an embed with server info',
	type: 'misc',
	usage: ['!serverinfo'],
	aliases: ['server'],
};
