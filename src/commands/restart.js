const { Access } = require("../config");

module.exports.run = async (client, message, args) => {
    if (!Access.DEVELOPERS.includes(message.author.id)) return;
    require("child_process").execSync("pm2 restart index");
};

module.exports.data = {
    name: "eval",
    description: "Evaluate input using JavaScript",
    type: "admin",
    hide: "true",
    aliases: null,
};