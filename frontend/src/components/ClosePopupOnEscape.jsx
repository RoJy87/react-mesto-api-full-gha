import { useEffect } from "react";

function ClosePopupOnEscape({ action }) {
  useEffect(() => {
    function handleEscClose(evt) {
      evt.key === "Escape" && action();
    }
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  });
}

export default ClosePopupOnEscape;
