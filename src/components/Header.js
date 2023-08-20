import { useLocation, Link } from "react-router-dom";
import headerLogo from "../images/header-logo.svg";

function Header(props) {
  const location = useLocation();

  function handleSignOut() {
    props.onSignOut();
  }

  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип 'Место'" className="header__logo" />

        {location.pathname === "/" && (
          <div className="header__container">
            <p className="header__email">{props.email}</p>
            <button onClick={handleSignOut} className="header__link header__button">Выйти</button>
          </div>
        )}

        {location.pathname === "/signup" && (
          <div className="header__container">
            <Link to="/signin" className="header__link">Войти</Link>
          </div>
        )}

        {location.pathname === "/signin" && (
          <div className="header__container">
            <Link to="/signup" className="header__link">Регистрация</Link>
          </div>
        )}
    </header>
  );
}

export default Header;
