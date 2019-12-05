const { RichEmbed } = require('discord.js');
const { Info, Logging } = require('../config');

module.exports = async (client) => {

	const username = Info.NAME;
	const startChannel = Logging.RESTART_CHANNEL;

	console.log(`Logged in as ${client.user.tag} (${client.user.id})`);
	client.user.setActivity('Beep boop', {
		type: 'STREAMING',
		url: 'https://twitch.tv/undecidedfactor',
	});

	const readyEmbed = new RichEmbed()
		.setTitle(`${username}: Process Started`)
		.setColor('3483eb')
		.setDescription(`${username} has successfully logged in`)
		.setTimestamp();

	client.channels.get(startChannel).send(readyEmbed);
};
