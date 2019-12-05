const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
const database = require("./util/database");
const client = new Client();

config({
	path: __dirname + "/.env",
});

database
	.connect()
	.then(() => {
		database.db("bot");
		client.login(process.env.CLIENT_TOKEN);
	})
	.catch(err => console.error("FATAL: Startup Error -> MongoDB\n" + err));

client.database = database;

fs.readdir("./events/", (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith(".js")) return;
		const event = require(`./events/${file}`);
		client.on(file.split(".")[0], event.bind(null, client));
		delete require.cache[require.resolve("./events/" + file)];
	});
});

client.commands = new Collection();
client.aliases = new Collection();

fs.readdir("./commands/", (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith(".js")) return;
		const props = require("./commands/" + file);
		const name = file.split(".")[0];
		client.commands.set(name, props);
		if(props.data && props.data.aliases)
			for(const alias of props.data.aliases)
				client.aliases.set(alias, name);
	});
});