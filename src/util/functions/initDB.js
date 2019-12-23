const database = require("../database");

module.exports = async (message) => {
    let [user, guild] = await Promise.all([
        await database.users.fetch(message.author.id),
        await database.guilds.fetch(message.guild.id),
    ]);
    if (!user) user = await database.users.create(message.author.id);
    if (!guild) guild = await database.guilds.create(message.guild.id);
    return [user, guild];
};