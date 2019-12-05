const { RichEmbed } = require("discord.js");
const { Colors } = require("../config");

module.exports.run = async (client, message, args, { guild, user, error }) => {

	const memberMention = message.mentions.members.first();
	const reason = args.slice(1).join(" ") || "None provided";
	if (!memberMention) return message.channel.send(
		new RichEmbed().setTitle("Ban").setColor(Colors.FAILED).setDescription("Incorrect usage. You must mention a valid user.").setFooter(message.author.tag, message.author.displayAvatarURL)
	);

	if (!memberMention.bannable) return message.channel.send(
		new RichEmbed().setTitle("Ban").setColor(Colors.FAILED).setDescription("I cannot ban the mentioned user. Make sure the Aero role is above the other roles.").setFooter(message.author.tag, message.author.displayAvatarURL)
	);

	await memberMention.ban(reason)
		.catch(err => {
			console.error(err);
			error(err);
		});

	const makeEmbed = new RichEmbed()
		.setTitle("Ban")
		.setDescription(`Successfully banned ${memberMention.user.tag} from the server!`)
		.addField("Moderator", `${message.author.tag} (${message.author.id})`)
		.addField("Reason", reason)
		.setTimestamp();

	message.channel.send(makeEmbed);

};

module.exports.data = {
	name: "ban",
	description: "Bans the specified user",
	type: "mod",
	usage: ["!ban <user> [reason]"],
	aliases: null,
};