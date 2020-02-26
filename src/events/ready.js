const { RichEmbed } = require('discord.js');
const { Info, Logging } = require('../config');

module.exports = async (client) => {

	const username = Info.NAME;

	console.log(`Logged in as ${client.user.tag} (${client.user.id})`);
	client.user.setActivity('Beep boop', {
		type: 'STREAMING',
		url: 'https://twitch.tv/undecidedfactor',
	});
};
