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

const api = { getArticles, logIn, logOut, getUserInfo };
export default api;