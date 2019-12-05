const { RichEmbed } = require("discord.js");
const { Colors } = require("../config");

module.exports.run = async (client, message, args, { guild, user, error }) => {

	const memberMention = message.mentions.members.first();
	const time = args[1];
	if (!memberMention || !time) return message.channel.send(
		new RichEmbed().setTitle("Mute").setColor(Colors.FAILED).setDescription("You must include a valid user and time (in minutes).").setFooter(message.author.tag, message.author.displayAvatarURL)
	);

	const getRole = message.guild.roles.find(role => role.name === "Muted");
	if (!getRole) return message.channel.send(
		new RichEmbed().setTitle("Mute").setColor(Colors.FAILED).setDescription("Make sure to create a role called `Muted` with the `SEND_MESSAGES` permission off.").setFooter(message.author.tag, message.author.displayAvatarURL)
	);
	if (memberMention.roles.has(getRole.id)) return message.channel.send(
		new RichEmbed().setTitle("Mute").setColor(Colors.FAILED).setDescription("The specified user is already muted. Run the `unmute` command to unmute.").setFooter(message.author.tag, message.author.displayAvatarURL)
	);
	memberMention.addRole(getRole.id).then(() => {
		const embed = new RichEmbed()
			.setTitle("Mute")
			.setColor(Colors.SUCCESS)
			.setDescription(`Successfully muted ${memberMention.user.tag} for ${time} minutes.`)
			.addField("Moderator", message.author.tag)
			.setFooter(message.author.tag, message.author.displayAvatarURL)
			.setTimestamp();

		message.channel.send(embed);

		setTimeout(() => {
			const getMember = message.guild.member(memberMention.id);
			if (!getMember) return;
			if (getMember.roles.has(getRole.id)) return getMember.removeRole(getRole.id);
			return false;
		}, 1000 * 60 * time);
	}).catch((e) => {
		message.reply("Failed to add the muted role, ensure I have the `MANAGE_ROLES` permission and that I am ranked above the mentioned user!");
		error(e);
	});
};

module.exports.data = {
	name: "mute",
	description: "Mutes the specified user",
	type: "mod",
	usage: ["!mute <user> <time>"],
	aliases: null,
};