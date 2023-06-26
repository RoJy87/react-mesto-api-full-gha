import { useEffect, useState } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { password } from "../utils/constants";
import { Link } from "react-router-dom";

function Register({ isLoadingButton, onRegister }) {
  const [buttonName, setButtonName] = useState("");
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  useEffect(() => {
    isLoadingButton
      ? setButtonName("Регистрация...")
      : setButtonName("Зарегистрироваться");
  }, [isLoadingButton]);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

  return (
    <div className="auth-page">
      <h2 className="auth-page__header">Регистрация</h2>
      <form
        action="/"
        className="form register__form-data"
        id="form-register"
        name="register"
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
          form="form-register"
          className={`auth-page__button button form-login-btn ${
            !isValid && "popup__save-btn_disabled"
          }`}
        >
          {buttonName}
        </button>
        <span className="link">
          Уже зарегистрированы?{" "}
          <Link className="link button" to="/sign-in">
            Войти
          </Link>
        </span>
      </form>
    </div>
  );
}

export default Register;
