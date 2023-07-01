import { urlRequest } from "./constants";

class Api {
  constructor({ url, headers, credentials }) {
    this._url = url;
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
      credentials: this._credentials,
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // заменить данные пользователя (PATCH)
  setUserInfo(body) {
    return fetch(`${this._url.userUrl}`, {
      method: "PATCH",
      credentials: this._credentials,
      headers: this._headers,
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
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({
        avatar: body.avatar,
      }),
    }).then(this._checkResponse);
  }

  // получить список всех карточек в виде массива (GET)
  getItems() {
    return fetch(`${this._url.cardsUrl}`, {
      credentials: this._credentials,
      headers: this._headers,
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
      credentials: this._credentials,
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // удалить карточку (DELETE)
  deleteCard(id) {
    return fetch(`${this._url.cardsUrl}/${id}`, {
      method: "DELETE",
      credentials: this._credentials,
      headers: this._headers,
    }).then(this._checkResponse);
  }

  // “залайкать” карточку
  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url.cardsUrl}/${id}/likes`, {
      method: `${isLiked ? "DELETE" : "PUT"}`,
      credentials: this._credentials,
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  url: urlRequest,
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
});
