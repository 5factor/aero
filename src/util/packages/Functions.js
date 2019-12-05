const fs = require('fs');

const functions = {};
for (const file of fs.readdirSync('./util/functions/')) {
	const fpath = '../functions/' + file;
	functions[file.split('.')[0]] = require(fpath);
}

module.exports = functions;