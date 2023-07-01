const { NODE_ENV } = process.env;

export const urlRequest = {
  baseUrl:
    NODE_ENV === "production"
      ? "https://api.simon.mesto.nomoreparties.sbs"
      : "http://localhost:3000",
  userUrl:
    NODE_ENV === "production"
      ? "https://api.simon.mesto.nomoreparties.sbs/users/me"
      : "http://localhost:3000/users/me",
  cardsUrl:
    NODE_ENV === "production"
      ? "https://api.simon.mesto.nomoreparties.sbs/cards"
      : "http://localhost:3000/cards",
  changeAvatarUrl:
    NODE_ENV === "production"
      ? "https://api.simon.mesto.nomoreparties.sbs/users/me/avatar"
      : "http://localhost:3000/users/me/avatar",
};

export const password = "[a-zA-Z0-9!@#$%^&*]{6,16}";
