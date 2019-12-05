const { RichEmbed } = require("discord.js");
const { Colors } = require("../../config");

module.exports = async (client, message, args, funcs) => {
	const { modrole, adminrole, commandchannels } = funcs.guild;
	let command = args.shift().toLowerCase();

	if (!client.commands.get(command)) {
		if (!client.aliases.get(command)) return;
		command = client.aliases.get(command);
	}
	command = client.commands.get(command);

	const embed = new RichEmbed()
		.setTitle("Incorrect Permissions")
		.setColor(Colors.FAILED)
		.setDescription("You do not have permission to use this command. If you think you have encountered this in error, feel free to contact us.")
		.setFooter(message.author.tag, message.author.displayAvatarURL);

	try {
		if (command.data.type === "mod") {
			if (!message.member.roles.get(modrole) && !message.member.roles.get(adminrole) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed);
			await command.run(client, message, args, funcs);
			return console.log(`Command run: ${command.data.name}`);
		}
		if (command.data.restricted === true) {
			if (!message.member.roles.get(adminrole) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embed);
			await command.run(client, message, args, funcs);
			return console.log(`Command run: ${command.data.name}`);
		}
		if (!commandchannels.length === 0) {
			if (!message.member.roles.get(modrole) && !message.member.roles.has(adminrole) && !message.member.hasPermission("ADMINISTRATOR")) {
				if (!commandchannels.includes(message.channel.id)) return;
			}
		}
		await command.run(client, message, args, funcs);
		console.log(`Command run: ${command.data.name}`);
	}
	catch (err) {
		console.log(err.stack);
	}
};
