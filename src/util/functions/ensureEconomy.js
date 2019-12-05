const database = require('../database');

module.exports = async (user, guild) => {
	const economy = new Map(guild.economy);
	if (!economy.has(user)) economy.set(user.id, { balance: 0, lastDaily: 0 });

	await database.guilds.update(guild.id, { economy: Array.from(economy) });

	// eslint-disable-next-line require-atomic-updates
	guild.economy = Array.from(economy);
	return [user, guild];
};