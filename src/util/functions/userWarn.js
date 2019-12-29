const nil = require("./nil");

module.exports = async (message, userId, guild) => {
    const { author: userObj, guild: guildObj } = message;
    const moderation = new Map(guild.moderation) || [];
    const warnings = new Map(guild.warnings) || [];

    const warnArr = warnings.get(userId) || [];
    if (!warnArr.length) return;

    const points = warnArr.reduce((acc, cur) => acc + cur.points, 0);
    console.log(points);

    if (points >= moderation.kick) {
        await userObj.send(`You have been kicked from ${guildObj.name} for recieving ${moderation.kick} warnings!`)
            .catch(nil);
        await guildObj.kick(userId, `Recieved ${moderation.kick} warnings.`)
            .catch(nil);
    }

    if (points >= moderation.ban) {
        await userObj.send(`You have been banned from ${guildObj.name} for recieving ${moderation.ban} warnings!`)
            .catch(nil);
        await guildObj.ban(userId, `Recieved ${moderation.ban} warnings.`)
            .catch(nil);
    }
};