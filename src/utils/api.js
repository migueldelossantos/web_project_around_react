class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers; 
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

    getInitialData() {
        return Promise.all([this.getProfileInfo(), this.getInitialCards()])
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
        .then(this._checkResponse)
    }

    addNewCard(data) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: data.place,
                link: data.link
            })
        })
        .then(this._checkResponse)
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(this._checkResponse)
    }

    changeLike(cardId, liked) {
        return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: liked ? 'DELETE' : 'PUT',
            headers: this.headers
        })
        .then(this._checkResponse)
    }

    getProfileInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
        .then(this._checkResponse)
    }

    updateProfileInfo(data) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._checkResponse)
    }

    updateProfileAvatar(data) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(this._checkResponse)
    }
}

const env = import.meta.env;

const  api = new Api({
  baseUrl: env.VITE_API_URL,
  headers: {
    authorization: env.VITE_API_KEY,
    'Content-Type': 'application/json'
  }
});

export default api;