const { RichEmbed } = require('discord.js');
const { Colors } = require('../config');
const options = ['yes', 'no', 'maybe', 'perhaps', 'reply hazy, ask again later', 'of course', 'definitely not'];

module.exports.run = (client, message, args) => {
	if (!args[0]) return message.channel.send(new RichEmbed()
		.setTitle('8ball')
		.setColor(Colors.DEFAULT)
		.setDescription('You must ask the 8ball a valid question!')
		.setFooter(message.author.tag, message.author.displayAvatarURL));

	const embed = new RichEmbed()
		.setTitle('🎱 ' + options[Math.floor(Math.random() * options.length)])
		.setColor(Colors.DEFAULT)
		.setFooter(message.author.tag, message.author.displayAvatarURL);

	message.channel.send(embed);
};

module.exports.data = {
	name: '8ball',
	description: 'Ask the magic 8ball a question',
	type: 'fun',
	usage: ['!8ball <question>'],
	aliases: null,
};
