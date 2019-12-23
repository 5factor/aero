const database = require("../database");

module.exports = async (user, guild) => {
    const leveling = new Map(guild.leveling) || [];

    if (!leveling.has(user._id)) leveling.set(user._id, { level: 1, xp: 0, lastXP: 175, lastMessage: 0 });

    await database.guilds.update(guild._id, { leveling: Array.from(leveling) });
    // eslint-disable-next-line require-atomic-updates
    guild.leveling = Array.from(leveling);

    return [user, guild];
};