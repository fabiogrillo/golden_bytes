'use strict'

const sqlite = require('sqlite3');
const db = require('./db');

exports.listGoals = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM goals';
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            const goals = rows.map((g) => ({
                goal_id: g.goal_id, description: g.description,
                total_steps: g.total_steps, current_step: g.current_step
            }));
            resolve(goals);
        })
    })
}

exports.addGoal = (description, total_steps, current_step) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO goals(description, total_stpes, current_step) VALUES(?,?,?)';
        db.run(sql, [description, total_steps, current_step], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};