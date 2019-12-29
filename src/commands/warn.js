const { RichEmbed } = require("discord.js");
const { userWarn } = require("../util/packages/Functions");
const { Colors } = require("../config");
const database = require("../util/database");

module.exports.run = async (client, message, args, { guild, user, error }) => {
    try {
        const target = message.mentions.users.first();
        if (!target) return message.channel.send(
            new RichEmbed()
                .setTitle("Warn")
                .setColor(Colors.FAILED)
                .setDescription("Incorrect usage. You must mention a valid user.")
                .setFooter(message.author.tag, message.author.displayAvatarURL)
        );
        let targetMember = message.guild.member(target);

        let points = isNaN(args[1]) ? 0 : parseInt(args[1]);
        if (!points < 0) points = 0;

        let reason = args.slice(2).join(" ");
        if (!reason) reason = "No reason provided";

        const warnings = new Map(guild.warnings);
        const arr = warnings.get(target.id) || [];

        arr.push({
            mod: message.author.id,
            date: new Date(),
            reason,
            points,
        });

        warnings.set(target.id, arr);

        database.guilds.update(message.guild.id, { warnings: Array.from(warnings) });
        userWarn(client, targetMember, target.id, guild, message.guild.name, message.guild.id);

        const warnEmbed = new RichEmbed()
            .setTitle(`Warned ${target.tag}`)
            .setColor(Colors.SUCCESS)
            .setDescription(`**Moderator**: ${message.author.tag}\n**Target**: ${target.tag}\n**Reason**: ${reason}\n**Points**: ${points}\n**Action**: Warn user`)
            .setFooter(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp();

        message.channel.send(warnEmbed);
    } catch (e) {
        error(e.stack);
    }
};

module.exports.data = {
    name: "warn",
    description: "Gives the mentioned user a warning",
    type: "mod",
    usage: ["!warn <user> [points] [reason]"],
    aliases: null,
};
