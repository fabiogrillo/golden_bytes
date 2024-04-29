'use strict'

const sqlite = require('sqlite3');
const db = require('./db');

// get articles
exports.listArticles = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT a.art_id, a.content, a.usr_id, a.date, a.tags, a.description, u.name FROM articles a INNER JOIN users u ON a.usr_id = u.id';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            //console.log(rows);
            const articles = rows.map((e) => ({
                id: e.art_id, content: e.content, usr_id: e.usr_id,
                date: e.date, tags: e.tags, description: e.description, name: e.name
            }));
            resolve(articles);
        });
    });
};

// GET current user articles' list
exports.getMyArticles = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM articles WHERE usr_id = ?';
        db.all(sql, [id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            if (rows === undefined) {
                resolve({ error: 'Impossible to retrieve personal scores!' });
            } else {
                const myArticles = rows.map((a) => ({
                    art_id: a.art_id, content: a.content, usr_id: a.usr_id, date: a.date,
                    tags: a.tags, description: a.description,
                }));
                resolve(myArticles);
            }
        });
    });
};

// GET article info by its id
exports.getArticleById = (art_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT a.*, u.name FROM articles a INNER JOIN users u ON a.usr_id = u.id WHERE art_id = ?';
        db.get(sql, [art_id], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row === undefined) {
                resolve({ error: 'Impossible to retrieve the selected article!' });
            } else {
                const myArticle = {
                    art_id: row.art_id,
                    content: row.content,
                    usr_id: row.usr_id,
                    date: row.date,
                    tags: row.tags,
                    description: row.description,
                    name: row.name,
                };
                resolve(myArticle);
            }
        });
    });
};

// get users
exports.listUsers = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const users = rows.map((u) => ({
                id: u.id, name: u.name
            }));
            resolve(users);
        })
    })
}

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
            resolve(this.changes);
        });
    });
};

// create a new tag
exports.createTag = (tag_name) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO tags(tag_name) VALUES(?)';
        db.run(sql, [tag_name], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.changes);
        });
    });
};

// update an existing article
exports.updateArticle = (art_id, usr_id, content, date, tags, description) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE articles SET usr_id = ?, content = ?, date = ?, tags = ?, description = ? WHERE art_id = ?';
        db.run(sql, [usr_id, content, date, tags, description, art_id], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.changes);
        });
    });
};

// delete a user's article
exports.deleteUserArticle = (usr_id, art_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM articles WHERE usr_id = ? AND art_id = ?';
        db.run(sql, [usr_id, art_id], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.changes);
        });
    });
};
