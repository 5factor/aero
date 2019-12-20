const database = require("../database");

module.exports = async (user, guild) => {
    const moderation = new Map(guild.moderation) || [];
    const warnings = new Map(guild.warnings) || [];
    
    const warnArr = warnings.get(user._id) || [];
    if (!warnArr.length) return;

    let totalPoints = 0;
    arr.forEach(w => {
        totalPoints = parseInt(totalPoints) + parseInt(w.points);
    });

    // moderation = [20: kick], [40: ban] (pointsAmount: moderationAction)
    // if totalPoints reaches a level in moderation (20 or 40), it kicks/bans them

	return [user, guild];
};