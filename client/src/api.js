const BASEURL = '/api';

async function getArticles() {
    // call: GET /api/articles/
    const response = await fetch(BASEURL + '/articles');
    const articlesJson = await response.json();
    if (response.ok) {
        return articlesJson;
    } else {
        throw articlesJson;
    }
};

async function getTags() {
    // call: GET /api/articles/
    const response = await fetch(BASEURL + '/tags');
    const tagsJson = await response.json();
    if (response.ok) {
        return tagsJson;
    } else {
        throw tagsJson;
    }
};

async function getMyArticles(id) {
    // call: GET /api/users/:id/articles
    const response = await fetch(BASEURL + '/users/' + id + '/articles');
    const myArticlesJson = await response.json();
    if (response.ok) {
        return myArticlesJson;
    } else {
        throw myArticlesJson;
    }
};

async function getArticleById(art_id) {
    // call: GET /api/articles/:art_id
    const response = await fetch(BASEURL + '/articles/' + art_id);
    const myArticleJson = await response.json();
    if (response.ok) {
        return myArticleJson;
    } else {
        throw myArticleJson;
    }
};

async function getGoalById(goal_id) {
    // call: GET /api/goals/_goal_id
    const response = await fetch(BASEURL + '/goals/' + goal_id);
    const myGoalJson = await response.json();
    if (response.ok) {
        return myGoalJson;
    } else {
        throw myGoalJson;
    }
};

async function addArticle(usr_id, content, date, tags, description) {
    //call: POST /api/users/:usr_id/articles
    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/users/' + usr_id + '/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: content, date: date, tags: tags, description: description }),
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                response.json()
                    .then((message) => { reject(message); })
                    .catch(() => { reject({ error: "Cannot parse server response." }) });
            }
        }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
    });
};

async function addGoal(description, total_steps, current_step) {
    //call: POST /api/goals
    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/goals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description: description, total_steps: total_steps, current_step: current_step }),
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                response.json()
                    .then((message) => { reject(message); })
                    .catch(() => { reject({ error: "Cannot parse server response." }) });
            }
        }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
    });
};

async function updateArticle(art_id, usr_id, content, date, tags, description) {
    // call: PUT /api/users/:usr_id/articles/:art_id
    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/users/' + usr_id + '/articles/' + art_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: content, date: date, tags: tags, description: description }),
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                response.json()
                    .then((message) => { reject(message); })
                    .catch(() => { reject({ error: "Cannot parse server response." }) });
            }
        }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
    });
};

async function updateGoal(goal_id, description, total_steps, current_step) {
    // call: PUT /api/goals/:goal_id
    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/goals/' + goal_id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description: description, total_steps: total_steps, current_step: current_step }),
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                response.json()
                    .then((message) => { reject(message); })
                    .catch(() => { reject({ error: "Cannot parse server response." }) });
            }
        }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
    });
};


async function deleteMyArticle(usr_id, art_id) {
    //call: DELETE /api/users/:usr_id/articles/:art_id
    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/users/' + usr_id + '/articles/' + art_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                response.json()
                    .then((message) => { reject(message); })
                    .catch(() => { reject({ error: "Cannot parse server response." }) });
            }
        }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
    });
};

async function deleteGoal(goal_id) {
    //call: DELETE /api/goals/:goal_id
    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/goals/' + goal_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) {
                resolve(null);
            } else {
                response.json()
                    .then((message) => { reject(message); })
                    .catch(() => { reject({ error: "Cannot parse server response." }) });
            }
        }).catch(() => { reject({ error: "Cannot communicate with the server." }) });
    });
};


async function getGoals() {
    // call: GET /api/goals/
    const response = await fetch(BASEURL + '/goals');
    const goalsJson = await response.json();
    if (response.ok) {
        return goalsJson;
    } else {
        throw goalsJson;
    }
};

// API Login & Logout
async function logIn(credentials) {
    let response = await fetch(BASEURL + '/sessions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    if (response.ok) {
        const user = await response.json();
        return user.name;
    }
    else {
        try {
            const errDetail = await response.json();
            throw errDetail.message;
        }
        catch (err) {
            throw err;
        }
    }
}

async function logOut() {
    console.log("sono qui dentro api");
    await fetch(BASEURL + '/sessions/current', { method: 'DELETE' });
}

async function getUserInfo() {
    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/sessions/current')
            .then((response) => {
                if (response.ok) {
                    response.json().then((obj) => resolve(obj));
                } else {
                    response.json().then((err) => reject(err));
                }
            })
            .catch((err) => {
                reject({ errors: [{ param: 'Server', msg: 'Cannot communicate' }] });
            });
    });
}

const api = {
    getArticles, getTags, logIn, logOut, getUserInfo,
    addArticle, getMyArticles, deleteMyArticle, getArticleById,
    updateArticle, getGoals, addGoal, deleteGoal, getGoalById,
    updateGoal
};
export default api;