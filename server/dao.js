'use strict'

const sqlite = require('sqlite3');

const db = new sqlite.Database('db.sqlite', (err) => {
    if(err) throw err;
});

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
            const articles = rows.map((e) => ({id: e.art_id, title: e.title, text: e.text, author: e.author,
                views: e.views, likes: e.likes, date: e.date}));
            resolve(articles);
        });
    });
};