const { RichEmbed } = require("discord.js");
const { Colors } = require("../../config");
const inviteRegex = require("invite-regex");

module.exports = async (message, guild) => {
	const { adminrole, modrole, linkfilter, wordblacklist, wordblacklistactive } = guild;
	const isUrl = /(https?:\/\/[^\s]+)/g;
	const isInvite = [ "discord.gg", "discordapp.com/invite", "invite.gg", "discord.center"];
	const diffargs = message.content.split(" ");

	if (message.member.roles.has(modrole) || message.member.roles.has(adminrole) || message.member.hasPermission("ADMINISTRATOR")) return;
	if (linkfilter) {
		if (diffargs.some(x => isUrl.test(x) || inviteRegex().test(x))) {
			const embed = new RichEmbed()
				.setTitle("Link detected")
				.setColor(Colors.FAILED)
				.setDescription("Uh oh, links are currently blacklisted in this server.")
				.setFooter(message.author.tag, message.author.displayAvatarURL);
			message.channel.send(embed);
			message.delete();
		}
	}
	const content = message.content.toLowerCase();
	if (wordblacklistactive && content.split(" ").some(a => wordblacklist.includes(a))) {
		const embed = new RichEmbed()
			.setTitle("Bad word detected")
			.setColor(Colors.FAILED)
			.setDescription("Uh oh, we detected a word in your message that has been blacklisted in this server.")
			.setFooter(message.author.tag, message.author.displayAvatarURL);
		message.channel.send(embed);
		message.delete();
	}
};