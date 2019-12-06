let MongoClient;
try {
	({ MongoClient } = require('mongodb'));
} catch (err) {
	require('child_process').execSync('npm i mongodb --save');
	({ MongoClient } = require('mongodb'));
}

const version = '1.5.5';
const author = 'Zytekaron#0572 (272659147974115328); UndecidedFactor#6819';

const mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

class MongoError extends Error {
	constructor(message) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = class {
	constructor({
		url = null,           // MongoDB URL
		strict = false,       // Strict Mode
		warn = true,          // Warn Mode
		log = console.log,    // Log Messages
		error = console.error // Log Errors
	} = {}) {
		Object.assign(this, {
			url, strict, warn, log, error,
			_connection: null, // Database connection
			_table: null,      // Collection name
			_db: null,         // Database name
		});
	}

	async connect(url = this.url) {
		return new Promise((resolve, reject) => {
			if (!url) {
				this._error('You must provide a MongoDB URL to connect to.');
				return reject('You must provide a MongoDB URL to connect to.');
			}
			MongoClient.connect(url, mongoClientOptions, (error, database) => {
				if (error) {
					this._error(error);
					return reject(error);
				} else this.log('Connected to the database.');
				this._connection = database;
				resolve(this);
			});
		});
	}

	async close() {
		return new Promise(resolve => {
			if (!this._connection) {
				if (this.strict) throw new MongoError('A database connection is not open.');
				if (this.warn) this._error('A database connection is not open.');
				return;
			}
			this._connection.close();
			this._connection = null;
			this.log('Closed the database.');
			resolve();
		});
	}

	db(...args) { return this.database(...args); }
	database(name) {
		if (!this._connection) return this._connection();
		if (!name || type(name) !== 'string') return this._error('You must specify a valid database name');
		this._db = name;
		return this;
	}

	col(...args) { return this.collection(...args); }
	collection(name) {
		if (!this._connection) return this._connection();
		if (!this.db) return this._db();
		if (!name || type(name) !== 'string') return this._error('You must specify a valid table name');
		this._table = name;
		return this;
	}

	async insert(_id, defaults) {
		if (!this._operationReady()) return;
		return new Promise((resolve, reject) => {
			const data = Object.assign({}, { _id }, defaults);
			this._connection
				.db(this._db)
				.collection(this._table)
				.insertOne(data, (error, result) => {
					if (error) {
						this._error(error);
						return reject(error);
					}
					resolve(result.result);
				});
		});
	}

	async insertMany(info) {
		if (!this._operationReady()) return;
		const data = this._idArray(info);
		return new Promise((resolve, reject) => {
			this._connection
				.db(this._db)
				.collection(this._table)
				.insertMany(data, (error, result) => {
					if (error) {
						this._error(error);
						return reject(error);
					}
					resolve(result.result);
				});
		});
	}

	async update(info, key, value) {
		if (!this._operationReady()) return;
		const query = this._id(info);
		return new Promise((resolve, reject) => {
			const data = { $set: this._data(key, value) };
			this._connection
				.db(this._db)
				.collection(this._table)
				.updateOne(query, data, (error, result) => {
					if (error) {
						this._error(error);
						return reject(error);
					}
					resolve(result.result);
				});
		});
	}

	async updateMany(info, key, value) {
		if (!this._operationReady()) return;
		const query = this._id(info);
		const data = { $set: this._data(key, value) };
		return new Promise((resolve, reject) => {
			this._connection
				.db(this._db)
				.collection(this._table)
				.updateMany(query, data, (error, result) => {
					if (error) {
						this._error(error);
						return reject(error);
					}
					resolve(result.result);
				});
		});
	}

	async delete(key) {
		if (!this._operationReady()) return;
		const query = this._id(key);
		return new Promise((resolve, reject) => {
			this._connection
				.db(this._db)
				.collection(this._table)
				.deleteOne(query, (error, result) => {
					if (error) {
						this._error(error);
						return reject(error);
					}
					resolve(result);
				});
		});
	}

	async deleteMany(key, value) {
		if (!this._operationReady()) return;
		let data = this._data(key, value);
		return new Promise((resolve, reject) => {
			this._connection
				.db(this._db)
				.collection(this._table)
				.deleteMany(query, (error, result) => {
					if (error) {
						this._error(error);
						return reject(error);
					}
					resolve(result);
				});
		});
	}

	async has(_id) {
		if (!this._operationReady()) return;
		return new Promise((resolve, reject) => {
			this._connection
				.db(this._db)
				.collection(this._table)
				.findOne({ _id }, (error, result) => {
					if (error) {
						this._error(error);
						return reject(error);
					}
					resolve(Boolean(result));
				});
		});
	}

	async get(_id) {
		if (!this._operationReady()) return;
		return new Promise((resolve, reject) => {
			this._connection
				.db(this._db)
				.collection(this._table)
				.findOne({ _id }, (error, result) => {
					if (error) {
						this._error(error);
						return reject(error);
					}
					resolve(result);
				});
		});
	}

	async find(key, value) {
		if (!this._operationReady()) return;
		let data = this._data(key, value);
		return new Promise((resolve, reject) => {
			this._connection
				.db(this._db)
				.collection(this._table)
				.findOne(data, (error, result) => {
					if (error) {
						this._error(error);
						return reject(error);
					}
					resolve(result);
				});
		});
	}

	async findMany(key, value) {
		if (!this._operationReady()) return;
		let data = this._data(key, value);
		return new Promise((resolve, reject) => {
			this._connection
				.db(this._db)
				.collection(this._table)
				.find(data).toArray((error, result) => {
					if (error) {
						this._error(error);
						return reject(error);
					}
					resolve(result);
				});
		});
	}

	async getAll() { return this.findAll(); }
	async findAll() {
		if (!this._operationReady()) return;
		return new Promise((resolve, reject) => {
			this._connection
				.db(this._db)
				.collection(this._table)
				.find({})
				.toArray((error, result) => {
					if (error) {
						this._error(error);
						return reject(error);
					}
					resolve(result);
				});
		});
	}



	// "Private" methods



	// MAIN: Data parser
	_data(key, value) {
		let data = {};
		if (key === 'id') key = '_id';
		if (key === '#id') key = 'id';
		if (type(key) === 'undefined') return this._error('You must specify a key/value pair or object');
		if (type(key) === 'object') return this._id(key);
		if (type(value) === 'undefined') return this._error('You must specify a value');
		return data;
	}
	// MAIN: ID / Primary Key Parser
	_id(key) {
		if (type(key) === 'object') {
			if (key['id']) key['_id'] = key['id'], delete key['id'];
			if (key['#id']) key['id'] = key['#id'], delete key['#id'];
			return key;
		}
		return { _id: key };
	}
	// MAIN: Array ID data parser
	_idArray(array) {
		const data = [];
		for (const item of array) data.push(this._id(item));
		return data;
	}

	// error: handler
	_operationReady() {
		if (!this._connection) return this._connection();
		if (!this.db) return this._db();
		if (!this._table) return this._table();
		if (!this._connection || !this.db || !this._table) return false;
		else return true;
	}
	// error: Query execution
	_error(error) {
		if (this.warn) this.error(error);
		if (this.strict) throw new MongoError(error);
	}
	// error: No table specified
	_table() {
		if (this.strict) throw new MongoError('No table was selected.');
		if (this.warn) this.error('No table was selected.');
	}
	// error: No database name
	_db() {
		if (this.strict) throw new MongoError('No database was selected.');
		if (this.warn) this.error('No database was selected.');
	}
	// error: No database connection
	_connection() {
		if (this.strict) throw new MongoError('There is no database connection open.');
		if (this.warn) this.error('There is no database connection open.');
	}

	version() { return version; }
	author() { return author; }
	static version() { return version; }
	static author() { return author; }

}

function type(obj) {
	return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}
