const { BOOKS_API_URL } = require('./constants');

class BookApi {
    constructor(baseUrl, headers) {
        this._headers = headers;
        this._baseUrl = baseUrl;
    }

    _request(url, options) {
        return fetch(url, options).then(this.resolveFetch)
    }

    resolveFetch(res) {
        if(res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Error: ${res.status}`);
        }
    }

    getAllBooks() {
        return this._request(`${this._baseUrl}/api/books`, {
            headers: this._headers
        })
    }

    getBookById(bookId) {
        return this._request(`${this._baseUrl}/api/books/${bookId}`)
    }

    updateBookId(bookId, data) {
        return this._request(`${this._baseUrl}/api/books/${bookId}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: this._headers
        });
    }

    deleteBookById(bookId, data) {
        return this._request(`${this._baseUrl}/api/books/${bookId}`, {
            method: "DELETE",
            body: JSON.stringify(data),
            headers: this._headers
        });
    }
}

const headers = {
    "Contend-Type": "application/json"
}

const baseUrl = BOOKS_API_URL;
const bookApi = new BookApi(baseUrl, headers);

module.exports = bookApi