import { token, urlRequest } from "./constants";

class Api {
  constructor({ url, headers, credentials }) {
    this._url = url;
    this._urlBase = url.baseUrl;
    this._headers = headers;
    this._credentials = credentials;
  }

  _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  // получить данные пользователя (GET)
  getUserInfo() {
    return fetch(`${this._url.userUrl}`, {
      headers: this._headers,
      credentials: this._credentials,
    }).then(this._checkResponse);
  }

  // заменить данные пользователя (PATCH)
  setUserInfo(body) {
    return fetch(`${this._url.userUrl}`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        name: body.name,
        about: body.about,
      }),
    }).then(this._checkResponse);
  }

  // заменить аватар (PATCH)
  setUserAvatar(body) {
    return fetch(`${this._url.changeAvatarUrl}`, {
      method: "PATCH",
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        avatar: body.avatar,
      }),
    }).then(this._checkResponse);
  }

  // получить список всех карточек в виде массива (GET)
  getItems() {
    return fetch(`${this._url.cardsUrl}`, {
      headers: this._headers,
      credentials: this._credentials,
    }).then(this._checkResponse);
  }

  // добавить карточку (POST)
  setItems(body) {
    return fetch(`${this._url.cardsUrl}`, {
      method: "POST",
      body: JSON.stringify({
        name: body.name,
        link: body.link,
      }),
      headers: this._headers,
      credentials: this._credentials,
    }).then(this._checkResponse);
  }

  // удалить карточку (DELETE)
  deleteCard(id) {
    return fetch(`${this._url.cardsUrl}/${id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: this._credentials,
    }).then(this._checkResponse);
  }

  // “залайкать” карточку
  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url.cardsUrl}/${id}/likes`, {
      method: `${isLiked ? "DELETE" : "PUT"}`,
      headers: this._headers,
      credentials: this._credentials,
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  url: urlRequest,
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
  credentials: "include",
});
