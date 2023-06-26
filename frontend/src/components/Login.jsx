import { useEffect, useState } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { password } from "../utils/constants";

function Login({ isLoadingButton, onLogin }) {
  const [buttonName, setButtonName] = useState("");
  const { values, setValues, handleChange, errors, isValid } =
    useFormAndValidation();

  useEffect(() => {
    isLoadingButton ? setButtonName("Вход...") : setButtonName("Войти");
  }, [isLoadingButton]);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values, setValues);
  }

  return (
    <div className="auth-page">
      <h2 className="auth-page__header">Вход</h2>
      <form
        action="/"
        className="form login__form-data"
        id="form-login"
        name="login"
        noValidate
        onSubmit={handleSubmit}
      >
        <label className="popup__form-field">
          <input
            id="email"
            className="auth-page__input"
            type="email"
            name="email"
            placeholder="email"
            required
            minLength="2"
            maxLength="20"
            value={values.email || ""}
            onChange={handleChange}
          />
          <span
            className={`popup-input-error popup__error ${
              !isValid && "popup__error_visible"
            }`}
          >
            {errors.email}
          </span>
        </label>
        <label className="popup__form-field">
          <input
            id="password"
            className="auth-page__input"
            type="password"
            name="password"
            placeholder="Пароль"
            required
            pattern={password}
            minLength="2"
            maxLength="20"
            value={values.password || ""}
            onChange={handleChange}
          />
          <span
            className={`password-input-error popup__error ${
              !isValid && "popup__error_visible"
            }`}
          >
            {errors.password}
          </span>
        </label>
        <button
          disabled={!isValid}
          type="submit"
          form="form-login"
          className={`auth-page__button button form-login-btn ${
            !isValid && "popup__save-btn_disabled"
          }`}
        >
          {buttonName}
        </button>
      </form>
    </div>
  );
}

export default Login;
