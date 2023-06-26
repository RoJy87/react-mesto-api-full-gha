import ClosePopupOnEscape from "./ClosePopupOnEscape";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen && "popup_opened"
      }`}
      onMouseDown={(evt) =>
        evt.target.classList.contains("popup") && props.onClose()
      }
    >
      <div className="popup__container">
        <button
          aria-label="Закрыть"
          className="popup__close-btn button"
          type="button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__header">{`${props.title}`}</h2>
        <form
          action="/"
          className="form popup__form-data"
          id={`form-${props.name}`}
          name={`${props.name}`}
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            disabled={!props.isValid}
            type="submit"
            form={`form-${props.name}`}
            className={`popup__save-btn button form-${props.name}-btn ${
              !props.isValid && "popup__save-btn_disabled"
            }`}
          >
            {props.btnName}
          </button>
        </form>
      </div>
      {props.isOpen && <ClosePopupOnEscape action={props.onClose} />}
    </div>
  );
}

export default PopupWithForm;
