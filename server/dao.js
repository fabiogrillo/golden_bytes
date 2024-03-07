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
            const articles = rows.map((e) => ({
                id: e.art_id, title: e.title, author: e.author,
                views: e.views, date: e.date, body: e.body
            }));
            resolve(articles);
        });
    });
};