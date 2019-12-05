const rpuppy = require("random-puppy");
const { RichEmbed } = require("discord.js");
const { Colors } = require("../config");

module.exports.run = async function(client, message, args) {
	const url = await rpuppy("cats");

	const embed = new RichEmbed()
		.setTitle("I found a cat!")
		.setColor(Colors.DEFAULT)
		.setImage(url)
		.setURL(url);

	message.channel.send(embed);
};

module.exports.data = {
	name: "cat",
	description: "Gets an image of a cat from r/cats",
	type: "fun",
	usage: ["!cat"],
	aliases: null,
};