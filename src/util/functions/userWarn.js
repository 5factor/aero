const nil = require("./nil");

module.exports = async (client, member, userId, guild, guildName) => {
    const moderation = new Map(guild.moderation);
    const warnings = new Map(guild.warnings);

    const warnArr = warnings.get(userId) || [];
    if (!warnArr.length) return;

    const points = warnArr.reduce((acc, cur) => acc + cur.points, 0);

    if (points >= moderation.get("kick")) {
        await client.users.get(userId).send(`You have been kicked from ${guildName} for recieving ${moderation.kick} warnings!`)
            .catch(e => console.log(e));
        await member.kick(`Recieved ${moderation.kick} warnings.`)
            .catch(e => { console.log(e); });
    }

    if (points >= moderation.get("ban")) {
        await client.users.get(userId).send(`You have been banned from ${guildName} for recieving ${moderation.ban} warnings!`)
            .catch(e => console.log(e));
        await member.ban(userId, `Recieved ${moderation.ban} warnings.`)
            .catch(e => console.log(e));
    }
};
