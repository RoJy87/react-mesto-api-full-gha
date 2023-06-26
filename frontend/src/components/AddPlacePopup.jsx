import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoadingButton }) {
  const [buttonName, setButtonName] = useState("");
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    isLoadingButton ? setButtonName("Сохранение...") : setButtonName("Создать");
  }, [isLoadingButton]);

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  return (
    <PopupWithForm
      name="add-place"
      title="Новое место"
      btnName={buttonName}
      isValid={isValid}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          id="place-name"
          className="popup__input popup__input_value_place-name"
          type="text"
          name="name"
          placeholder="Название места"
          required
          minLength="2"
          maxLength="30"
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
          id="link"
          className="popup__input popup__input_value_link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
          value={values.link || ""}
          onChange={handleChange}
        />
        <span
          className={`link-input-error popup__error ${
            !isValid && "popup__error_visible"
          }`}
        >
          {errors.link}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
