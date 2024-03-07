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

const api = {getArticles};
export default api;