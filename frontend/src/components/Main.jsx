import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import avatar__image from "../image/avatar__image.jpg";
import Footer from "./Footer";

function Main({ onLoadingSpinner, ...props }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <main className="main">
        <section className="profile">
          <button
            onClick={props.onEditAvatar}
            aria-label="Редактировать аватар"
            className="profile__avatar-btn button"
            type="button"
          >
            <img
              src={currentUser.avatar ?? avatar__image}
              alt="Аватар пользователя"
              className="profile__avatar"
            />
          </button>
          <div className="profile__info">
            <div className="profile__wrapper">
              <h1 className="profile__name">
                {currentUser.name ?? "Жак-Ив-Кусто"}
              </h1>
              <p className="profile__description">
                {currentUser.about ?? "Исследователь океана"}
              </p>
            </div>
            <button
              onClick={props.onEditProfile}
              aria-label="Редактировать профиль"
              type="button"
              className="profile__edit-btn button"
            ></button>
          </div>
          <button
            onClick={props.onAddPlace}
            aria-label="Добавить место"
            type="button"
            className="profile__add-btn button"
          ></button>
        </section>

        <section aria-label="Интересные места для посещения">
          <ul className="places">
            {props.cards.map((card) => {
              return (
                <Card
                  card={card}
                  key={card._id}
                  onCardClick={() => props.onCardClick(card)}
                  onCardLike={(isLiked) => props.onCardLike(card, isLiked)}
                  onCardDelete={() => props.onCardDelete(card)}
                />
              );
            })}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;
