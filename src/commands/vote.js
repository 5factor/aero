const { RichEmbed } = require('discord.js');
const { Colors } = require('../config');

module.exports.run = async (client, message, args, { guild, user, error }) => {
	const { prefix } = guild;

	if (!args[0] || !args[1]) return message.channel.send(new RichEmbed().setTitle('Vote').setDescription(`Incorrect usage. Run \`${prefix}help vote\` to view usage`).setFooter(message.author.tag, message.author.displayAvatarURL));

	const votereply = new RichEmbed()
		.setTitle(args[0])
		.setColor(Colors.DEFAULT)
		.setDescription(args.slice(1).join(' '))
		.setFooter(message.author.tag, message.author.displayAvatarURL);

	const msg = await message.channel.send(votereply);
	await msg.react('629110600957689924');
	await msg.react('629110586126630923');
};

module.exports.data = {
	name: 'vote',
	description: 'Initiate a vote',
	type: 'fun',
	usage: ['!vote <subject> <description>'],
	aliases: null,
};
