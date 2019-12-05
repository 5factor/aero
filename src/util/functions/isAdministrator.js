module.exports = async (message, guild) => {
	const { adminrole } = guild;

	if (!message.member.roles.has(adminrole) && !message.member.hasPermission('ADMINISTRATOR')) return;
};