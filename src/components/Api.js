export default class Api {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status} - ${res.statusText}`);
    });
  }

  getUserInfo() {
    return fetch(`${this._baseURL}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status} - ${res.statusText}`);
    });
  }

  updateUserInfo(data) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.description,
      }),
    }).then((res) => {
      if (res.ok) {
        console.log(res);
        return res.json();
      }
      return Promise.reject(`Error: ${res.status} - ${res.statusText}`);
    });
  }

  updateUserAvatar(data) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link,
      }),
    }).then((res) => {
      if (res.ok) {
        console.log(res);
        return res.json();
      }
      return Promise.reject(`Error: ${res.status} - ${res.statusText}`);
    });
  }

  addCardData(data) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.link,
      }),
    }).then((res) => {
      if (res.ok) {
        console.log(res);
        return res.json();
      }
      return Promise.reject(`Error: ${res.status} - ${res.statusText}`);
    });
  }

  likeCard(cardId, isLiked) {
    const method = isLiked ? "DELETE" : "PUT";
    return fetch(`${this._baseURL}/cards/likes/${cardId}`, {
      method: method,
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status} - ${res.statusText}`);
    });
  }

  deleteCardData(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(
        `Error deleting card: ${res.status} - ${res.statusText}`
      );
    });
  }

  processInitialRequests(requestsArray) {
    return Promise.all(requestsArray).then((res) => {
      return res;
    });
  }
}
