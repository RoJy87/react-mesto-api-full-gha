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
      {path === "/main" && (
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
      {path === "/signin" && (
        <Link className="header__link button" to="/signup">
          Регистрация
        </Link>
      )}
      {path === "/signup" && (
        <Link className="header__link button" to="/signin">
          Войти
        </Link>
      )}
    </header>
  );
}

export default Header;
