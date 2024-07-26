const { USERS_API_URL } = require('./constants');


class UserApi {
    constructor(baseUrl, headers) {
        this._headers = headers;
        this.baseUrl = baseUrl;
    }

    _request(url, options) {
        return fetch(url, options).then(this.resolveFetch);
    }

    resolveFetch(res) {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Error: ${res.status}`);
        }
    }

    getUserById(userId) {
        return this._request(`${this_baseUrl}/api/user/${userId}`, {
            headers: this._headers
        });
    }
}

const headers = {
    "Contend-Type": "application/json"
}

const baseUrl = USERS_API_URL;
const userApi = new UserApi(baseUrl, headers);

module.exports = UserApi;