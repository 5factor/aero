const database = require("../database");

module.exports = async (user, guild, message) => {
    const { leveling, levelingactive } = guild;

    if (levelingactive) {
        const levelingArray = new Map(leveling);
        const userLeveling = levelingArray.get(user._id);

        const date = Date.now();
        const delay = 10000;

        if ((date - userLeveling.lastMessage) >= delay) {
            const messageXP = Math.floor(Math.random() * 20) + 5;

            userLeveling.xp += messageXP;
            userLeveling.lastMessage = date;

            if (userLeveling.xp >= userLeveling.lastXP) {
                userLeveling.level++;
                userLeveling.lastXP *= 2.2;
                message.reply(`Congrats! You just hit level ${userLeveling.level}!`);
            }

            await database.guilds.update(guild._id, { leveling: Array.from(leveling) });
        }
    }
    return [user, guild];
};