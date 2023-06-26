import { Link, useLocation } from "react-router-dom";
import logo from "../image/logo.svg";

function Header({ onClickMenu, isMenuVisible }) {
  const path = useLocation().pathname;
  function handleClickMenu() {
    onClickMenu();
  }
  return (
    <header className="header">
      <img src={logo} alt="Логотип Место" className="header__logo" />
      {path === "/react-mesto-auth" && (
        <button
          type="button"
          onClick={handleClickMenu}
          className={`header__button button ${isMenuVisible && "opened"}`}
        >
          <span className="bar-top"></span>
          <span className="bar-mid"></span>
          <span className="bar-bot"></span>
        </button>
      )}
      {path === "/sign-in" && (
        <Link className="header__link button" to="/sign-up">
          Регистрация
        </Link>
      )}
      {path === "/sign-up" && (
        <Link className="header__link button" to="/sign-in">
          Войти
        </Link>
      )}
    </header>
  );
}

export default Header;
