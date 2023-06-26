import ClosePopupOnEscape from "./ClosePopupOnEscape";

function ImagePopup({ name, card, onClose }) {
  return (
    <div
      className={`popup popup_type_${name} ${card && "popup_opened"}`}
      onMouseDown={(evt) => evt.target.classList.contains("popup") && onClose()}
    >
      {card && <ClosePopupOnEscape action={onClose} />}
      <div className="popup__container popup__container_style_reset">
        <button
          aria-label="Закрыть"
          className="popup__close-btn button"
          type="button"
          onClick={onClose}
        ></button>
        <figure className="popup__img-block">
          <img src={card?.link} alt={card?.name} className="popup__photo" />
          <figcaption className="popup__caption">{card?.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
