import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoadingButton }) {
  const currentUser = useContext(CurrentUserContext);
  const [buttonName, setButtonName] = useState("");
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    isLoadingButton
      ? setButtonName("Сохранение...")
      : setButtonName("Сохранить");
  }, [isLoadingButton]);

  useEffect(() => {
    resetForm(currentUser, {}, true);
  }, [currentUser, isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      btnName={buttonName}
      isValid={isValid}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          id="name"
          className="popup__input popup__input_value_name"
          type="text"
          name="name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          value={values.name || ""}
          onChange={handleChange}
        />
        <span
          className={`name-input-error popup__error ${
            !isValid && "popup__error_visible"
          }`}
        >
          {errors.name}
        </span>
      </label>
      <label className="popup__form-field">
        <input
          id="about"
          className="popup__input popup__input_value_about"
          type="text"
          name="about"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          value={values.about || ""}
          onChange={handleChange}
        />
        <span
          className={`name-input-error popup__error ${
            !isValid && "popup__error_visible"
          }`}
        >
          {errors.about}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
