import logo from '../images/header__logo.svg';
import { Route, Routes } from "react-router-dom";
import { NavLink } from "react-router-dom";
function Header({ userEmail, deleteToken }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип"></img>
      <div className="header__info">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <p className="header__text">{userEmail}</p>
                <NavLink
                  className="header__signout"
                  to="/sign-in"
                  onClick={deleteToken}
                >
                  Выйти
                  </NavLink>
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <NavLink
                className="header__text header__link"
                to="/sign-in"
              >
                Войти
              </NavLink>
            }
          />
          <Route
            path="/sign-in"
            element={
              <NavLink
                className="header__text header__link"
                to="/sign-up"
              >
                Регистрация
              </NavLink>
            }
          />
        </Routes>

      </div>
    </header>
  );
}

export default Header;