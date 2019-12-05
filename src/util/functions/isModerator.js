module.exports = async (message, guild) => {
	const { modrole } = guild;

	if (!message.member.roles.has(modrole) && !message.member.hasPermission('ADMINISTRATOR')) return;
};
