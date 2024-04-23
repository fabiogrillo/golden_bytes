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
                total_steps: g.total_steps, current_step: g.current_step,
                start_date: g.start_date, additional_info: g.additional_info
            }));
            resolve(goals);
        })
    })
}

exports.addGoal = (description, total_steps, current_step, start_date, additional_info) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO goals(description, total_steps, current_step, start_date, additional_info) VALUES(?,?,?,?,?)';
        db.run(sql, [description, total_steps, current_step, start_date, additional_info], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

exports.deleteGoal = (goal_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM goals WHERE goal_id = ?';
        db.run(sql, [goal_id], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.changes);
        });
    });
};

// GET goal info by its id
exports.getGoalById = (goal_id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM goals WHERE goal_id = ?';
        db.get(sql, [goal_id], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            if (row === undefined) {
                resolve({ error: "Ipossible to retrieve the selectd goal!" });
            } else {
                const myGoal = {
                    goal_id: row.goal_id,
                    description: row.description,
                    total_steps: row.total_steps,
                    current_step: row.current_step,
                    start_date: row.start_date,
                    additional_info: row.additional_info
                };
                resolve(myGoal);
            }
        });
    });
};

// update an existing goal
exports.updateGoal = (goal_id, description, total_steps, current_step, start_date, additional_info) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE goals SET description = ?, total_steps = ?, current_step = ?, start_date = ?, additional_info = ? WHERE goal_id = ?';
        db.run(sql, [description, total_steps, current_step, start_date, additional_info, goal_id], function (err) {
            if (err) {
                reject(err);
                return;
            }
            if (this.changes > 0) {
                resolve(this.changes);
            } else {
                reject({ message: "No rows were affected. The goal may not exist." });
            }
        });
    });
};