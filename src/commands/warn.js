const { RichEmbed } = require('discord.js');
const { Colors } = require('../config');
const database = require('../util/database');

module.exports.run = async (client, message, args, { guild, user, error }) => {
	try {
		const target = message.mentions.users.first();
		if (!target) return message.channel.send(
			new RichEmbed().setTitle('Warn').setColor(Colors.FAILED).setDescription('Incorrect usage. You must mention a valid user.').setFooter(message.author.tag, message.author.displayAvatarURL)
		);

		let reason = args.slice(1).join(' ');
		if (!reason) reason = 'None';

		const warnings = new Map(guild.warnings);
		const arr = warnings.get(target.id) || [];

		arr.push({ mod: message.author.id, reason, date: new Date() });
		warnings.set(target.id, arr);
		database.guilds.update(message.guild.id, { warnings: Array.from(warnings) });

		const warnEmbed = new RichEmbed()
			.setTitle(`Warned ${target.tag}`)
			.setColor(Colors.SUCCESS)
			.setDescription(`**Moderator**: ${message.author.tag}\n**Target**: ${target.tag}\n**Reason**: ${reason}\n**Action**: Warn user`)
			.setFooter(message.author.tag, message.author.displayAvatarURL)
			.setTimestamp();

		message.channel.send(warnEmbed);
	}
	catch (e) {
		error(e.stack);
	}
};

module.exports.data = {
	name: 'warn',
	description: 'Gives the mentioned user a warning',
	type: 'mod',
	usage: ['!warn <user> [reason]'],
	aliases: null,
};