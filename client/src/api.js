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
    // call: GET /api/articles/:id
    const response = await fetch(BASEURL + '/articles/' + id);
    const myArticlesJson = await response.json();
    if (response.ok) {
        return myArticlesJson;
    } else {
        throw myArticlesJson;
    }
};

async function addArticle(usr_id, content, date, tags, description) {
    //call: POST /api/articles
    return new Promise((resolve, reject) => {
        fetch(BASEURL + '/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usr_id: usr_id, content: content, date: date, tags: tags, description: description }),
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
}

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

const api = { getArticles, getTags, logIn, logOut, getUserInfo, addArticle, getMyArticles };
export default api;