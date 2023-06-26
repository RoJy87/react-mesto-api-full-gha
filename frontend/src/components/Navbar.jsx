import { useLocation } from "react-router-dom";

function Navbar({ email, onSignOut, isMenuVisible }) {
  const path = useLocation().pathname;

  function signOut() {
    onSignOut();
  }

  return (
    <div
      className={`header__title ${
        path === "/react-mesto-auth" && isMenuVisible && "header__title_active"
      }`}
    >
      {path === "/react-mesto-auth" && (
        <div className="header__menu">
          <span className="header__email">{email}</span>
          <button
            onClick={signOut}
            className="header__link header__link_login button"
          >
            Выйти
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
