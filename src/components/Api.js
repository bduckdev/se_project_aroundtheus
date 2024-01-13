export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._headers.authorization,
      },
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  updateProfileInfo(name, description) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: description,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  updateAvatar(img) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: img,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        _id: cardId,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({
        _id: cardId,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        _id: cardId,
      }),
    }).then((res) => {
      return this._checkResponse(res);
    });
  }
  initialLoad() {
    const getData = this.getUserData();
    const getCards = this.getInitialCards();
    return Promise.all([getData, getCards]).then((data) => {
      return data;
    });
  }
}
