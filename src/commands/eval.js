const { RichEmbed } = require('discord.js');
const { inspect } = require('util');
const { Access, Colors } = require('../config');

module.exports.run = async (client, message, args) => {
	if (!Access.DEVELOPERS.includes(message.author.id)) return;

	let ev = args.join(' ');

	let silent = false;
	let hide = false;
	if (/\s-s$/.exec(ev) !== null) {
		silent = true;
		ev = ev.replace(/\s-s$/, '');
	}
	if (/\s-h$/.exec(ev) !== null) {
		hide = true;
		ev = ev.replace(/\s-h$/, '');
	}
	if (/\s-s$/.exec(ev) !== null) {
		silent = true;
		ev = ev.replace(/\s-s$/, '');
	}

	if (hide) message.delete();
	let err = false;
	let evaled;
	try {
		evaled = await eval(ev);
		if (typeof evaled !== 'string')
			evaled = inspect(evaled);
	}
	catch (e) {
		evaled = e.stack;
		err = true;
	}
	const embed = new RichEmbed()
		.addField('Input', '```xl\n' + clean(ev) + '```')
		.addField('Output', '```xl\n' + clean(evaled) + '```')
		.setTimestamp();
	err ? embed.setColor(Colors.FAILED) : embed.setColor(Colors.SUCCESS);
	if (!silent) message.channel.send(embed);
};

module.exports.data = {
	name: 'eval',
	description: 'Evaluate input using JavaScript',
	type: 'admin',
	hide: 'true',
	aliases: null,
};

function clean(text) {
	return typeof (text) !== 'string'
		? text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
		: text;
}
