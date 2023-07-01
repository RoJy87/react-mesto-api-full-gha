import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isOwn, setIsOwn] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (card.owner === currentUser._id) {
      setIsOwn(true);
    }
    if (card.likes.some(i => i === currentUser._id)) {
      setIsLiked(true);
    } else { setIsLiked(false); }
  }, [card, currentUser, isOwn, isLiked]);

  const cardLikeButtonClassName = `place__like-btn button ${
    isLiked && "place__like-btn_active"
  }`;

  return (
    <li className="places__items">
      <article className="place">
        <button
          onClick={onCardClick}
          type="button"
          className="place__img-btn button"
        >
          <img src={card.link} alt={card.name} className="place__photo" />
        </button>
        <div className="place__wrapper-name">
          <h2 className="place__name">{card.name}</h2>
          <div className="place__like-wrapper">
            <button
              aria-label="Отметить мне нравиться"
              type="button"
              className={cardLikeButtonClassName}
              onClick={() => onCardLike(isLiked)}
            ></button>
            <span className="place__like-count">{card.likes.length}</span>
          </div>
        </div>
      </article>
      {isOwn && (
        <button
          aria-label="Удалить карточку"
          type="button"
          className="place__delete-btn button"
          onClick={onCardDelete}
        ></button>
      )}
    </li>
  );
}

export default Card;
