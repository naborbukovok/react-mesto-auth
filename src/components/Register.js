import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  }

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.onRegister(email, password);
  }

    return (
      <div className="entry">
        <h1 className="entry__title">Регистрация</h1>
        <form className="entry__form" onSubmit={handleSubmit}>
          <label className="entry__form-field">
            <input
              name="email"
              placeholder="Email"
              type="email"
              className="entry__form-input"
              id="email"
              required
              value={email}
              onChange={handleEmailChange}
            />
          </label>

          <label className="entry__form-field">
            <input
              name="password"
              placeholder="Пароль"
              type="password"
              className="entry__form-input"
              id="password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
          </label>

          <button type="submit" className="entry__form-button">
              Зарегистрироваться
          </button>

          <Link to="/signin" className="entry__link">Уже зарегистрированы? Войти</Link>
        </form>
      </div>
    );
}

export default Register;
