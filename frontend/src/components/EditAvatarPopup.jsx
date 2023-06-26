import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoadingButton }) {
  const currentUser = useContext(CurrentUserContext);
  const inputRef = React.useRef("");
  const [buttonName, setButtonName] = useState("");
  const { handleChange, errors, isValid, resetForm } = useFormAndValidation();

  useEffect(() => {
    isLoadingButton
      ? setButtonName("Сохранение...")
      : setButtonName("Сохранить");
  }, [isLoadingButton]);

  useEffect(() => {
    resetForm((inputRef.current.value = ""));
  }, [currentUser, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      btnName={buttonName}
      isValid={isValid}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          id="avatar"
          className="popup__input popup__input_value_avatar"
          type="url"
          name="avatar"
          placeholder="Ссылка на картинку"
          required
          ref={inputRef}
          onChange={handleChange}
        />
        <span
          className={`avatar-input-error popup__error ${
            !isValid && "popup__error_visible"
          }`}
        >
          {errors.avatar}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
