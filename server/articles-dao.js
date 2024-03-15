'use strict'

const sqlite = require('sqlite3');
const db = require('./db');

// get articles
exports.listArticles = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM articles';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            //console.log(rows);
            const articles = rows.map((e) => ({
                id: e.art_id, content: e.content, usr_id: e.usr_id,
                date: e.date, tags: e.tags, description: e.description
            }));
            resolve(articles);
        });
    });
};

// get tags
exports.listTags = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tags';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            //console.log(rows);
            const tags = rows.map((t) => ({
                name: t.tag_name, color: t.color
            }));
            resolve(tags);
        });
    });
};

// create a new article
exports.createArticle = (usr_id, content, date, tags, description) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO articles(usr_id, content, date, tags, description) VALUES(?,?,?,?,?)';
        db.run(sql, [usr_id, content, date, tags, description], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};