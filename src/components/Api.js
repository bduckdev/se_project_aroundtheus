export default class Api {
  constructor({ baseUrl, headers: { authorization } }) {
    this.baseUrl = baseUrl;
    this.headers = {
      authorization,
    };
  }
  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.headers.authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  updateProfileInfo(name, description) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: description,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }
  updateAvatar(img) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: img,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.headers.authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
  addCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: cardId,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }
  likeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: cardId,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }
  unlikeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: cardId,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }
}
