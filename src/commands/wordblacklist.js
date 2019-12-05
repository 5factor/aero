const { RichEmbed } = require('discord.js');
const { Colors } = require('../config');
const database = require('../util/database');

module.exports.run = async (client, message, args, { guild, user, error }) => {
	try {
		const type = args[0];
		const allowedTypes = ['enable', 'disable', 'add', 'remove'];

		if (!allowedTypes.includes(type)) return message.channel.send(
			new RichEmbed().setTitle('Word Blacklist').setColor(Colors.FAILED).setDescription('Incorrect usage. You must use a valid keyword (`enable`, `disable`, `add`, `remove`).').setFooter(message.author.tag, message.author.displayAvatarURL)
		);

		if (type === 'enable') {
			database.guilds.update(message.guild.id, { wordblacklistactive: true });
			return message.channel.send(
				new RichEmbed().setTitle('Word Blacklist').setColor(Colors.SUCCESS).setDescription(`**Moderator**: ${message.author.tag}\n**Set to**: Enabled`).setFooter(message.author.tag, message.author.displayAvatarURL).setTimestamp()
			);
		}

		if (type === 'disable') {
			database.guilds.update(message.guild.id, { wordblacklistactive: false });
			return message.channel.send(
				new RichEmbed().setTitle('Word Blacklist').setColor(Colors.SUCCESS).setDescription(`**Moderator**: ${message.author.tag}\n**Set to**: Disabled`).setFooter(message.author.tag, message.author.displayAvatarURL).setTimestamp()
			);
		}

		if (type === 'add') {
			const newArr = guild.wordblacklist;
			const phrase = args.slice(1).join(' ').toLowerCase();

			if (!phrase) return message.channel.send(
				new RichEmbed().setTitle('Word Blacklist').setColor(Colors.FAILED).setDescription('Incorrect usage. You must include a valid word/phrase.').setFooter(message.author.tag, message.author.displayAvatarURL)
			);
			if (newArr.includes(phrase)) return message.channel.send(
				new RichEmbed().setTitle('Word Blacklist').setColor(Colors.FAILED).setDescription('The word/phrase provided is already blacklisted.').setFooter(message.author.tag, message.author.displayAvatarURL)
			);

			newArr.push(phrase);
			database.guilds.update(message.guild.id, { wordblacklist: newArr });
			return message.channel.send(
				new RichEmbed().setTitle('Word Blacklist').setColor(Colors.SUCCESS).setDescription(`**Moderator**: ${message.author.tag}\n**Word**: ${phrase}\n**Set to**: Blacklisted`).setFooter(message.author.tag, message.author.displayAvatarURL).setTimestamp()
			);
		}

		if (type === 'remove') {
			const newArr = guild.wordblacklist;
			const phrase = args.slice(1).join(' ').toLowerCase();

			if (!phrase) return message.channel.send(
				new RichEmbed().setTitle('Word Blacklist').setColor(Colors.FAILED).setDescription('Incorrect usage. You must include a valid word/phrase.').setFooter(message.author.tag, message.author.displayAvatarURL)
			);
			if (!newArr.includes(phrase)) return message.channel.send(
				new RichEmbed().setTitle('Word Blacklist').setColor(Colors.FAILED).setDescription('The word/phrase provided is not blacklisted.').setFooter(message.author.tag, message.author.displayAvatarURL)
			);

			newArr.splice(newArr.findIndex(el => el === phrase));
			database.guilds.update(message.guild.id, { wordblacklist: newArr });
			return message.channel.send(
				new RichEmbed().setTitle('Word Blacklist').setColor(Colors.SUCCESS).setDescription(`**Moderator**: ${message.author.tag}\n**Word**: ${phrase}\n**Set to**: Not blacklisted`).setFooter(message.author.tag, message.author.displayAvatarURL).setTimestamp()
			);
		}
	}
	catch (e) {
		error(e.stack);
	}
};

module.exports.data = {
	name: 'wordblacklist',
	description: 'Enable blacklist, disable blacklist, add a word or remove a word from the blacklist',
	type: 'mod',
	usage: ['!wordblacklist <enable/disable/add/remove> [word]'],
	aliases: null,
};