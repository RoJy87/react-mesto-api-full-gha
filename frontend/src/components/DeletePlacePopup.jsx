import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePlacePopup({
  isOpen,
  onClose,
  onDeletePlace,
  isLoadingButton,
  card,
}) {
  const [buttonName, setButtonName] = useState("");

  useEffect(() => {
    isLoadingButton ? setButtonName("Сохранение...") : setButtonName("Да");
  }, [isLoadingButton]);

  function handleSubmit(e) {
    e.preventDefault();
    onDeletePlace(card);
  }

  return (
    <PopupWithForm
      name="delete-place"
      title="Вы уверены?"
      btnName={buttonName}
      isValid={true}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default DeletePlacePopup;
