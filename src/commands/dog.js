const rpuppy = require("random-puppy");
const { RichEmbed } = require("discord.js");
const { Colors } = require("../config");

module.exports.run = async function(client, message, args) {
	const url = await rpuppy("dogs");

	const embed = new RichEmbed()
		.setTitle("I found a dog!")
		.setColor(Colors.DEFAULT)
		.setImage(url)
		.setURL(url);

	message.channel.send(embed);
};

module.exports.data = {
	name: "dog",
	description: "Gets an image of a dog from r/dogs",
	type: "fun",
	usage: ["!dog"],
	aliases: null,
};