'use strict';

const sqlite = require('sqlite3');

//open db
const db = new sqlite.Database('./db.sqlite', (err) => {
    if (err) throw err;
});


module.exports = db;