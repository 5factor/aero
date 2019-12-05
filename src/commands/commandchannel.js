const { RichEmbed } = require('discord.js');
const { Colors } = require('../config');
const database = require('../util/database');

module.exports.run = async (client, message, args, { guild, error }) => {
	try {
		if (!message.content.includes('disable') && !message.mentions.channels.first()) return message.channel.send(
			new RichEmbed().setTitle('Command Channel').setColor(Colors.FAILED).setDescription('Incorrect usage. You must mention a valid channel.').setFooter(message.author.tag, message.author.displayAvatarURL)
		);

		let t;
		const arr = guild.commandchannels || [];

		if (message.content.includes('disable')) {
			database.guilds.update(message.guild.id, { commandchannels: [] });
			return message.channel.send(
				new RichEmbed().setTitle('Command Channel').setColor(Colors.SUCCESS).setDescription(`**Moderator**: ${message.author.tag}\n**Channel** N/A\n**Set to**: Commands can be used in all channels`).setFooter(message.author.tag, message.author.displayAvatarURL).setTimestamp()
			);
		}

		if (arr.includes(message.mentions.channels.first().id)) {
			const newArr = guild.commandchannels;
			newArr.splice(newArr.findIndex(el => el === message.mentions.channels.first().id));
			database.guilds.update(message.guild.id, { commandchannels: newArr });
			t = 'Can\'t use commands';
		}
		else {
			const newArr = guild.commandchannels;
			newArr.push(message.mentions.channels.first().id);
			database.guilds.update(message.guild.id, { commandchannels: newArr });
			t = 'Can use commands';
		}


		const filterEmbed = new RichEmbed()
			.setTitle('Command Channel')
			.setColor(Colors.SUCCESS)
			.setDescription(`**Moderator**: ${message.author.tag}\n**Channel** ${message.mentions.channels.first().name}\n**Set to**: ${t}`)
			.setFooter(message.author.tag, message.author.displayAvatarURL)
			.setTimestamp();

		message.channel.send(filterEmbed);

	}
	catch (e) {
		error(e.stack);
	}
};

module.exports.data = {
	name: 'commandchannel',
	description: 'Toggles the ability for users to use commands in the specified channel',
	type: 'mod',
	usage: ['!commandchannel <#channel/false/true>'],
	aliases: null,
};