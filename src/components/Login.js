import React from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth.js";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  }

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!email || !password) {
      return;
    }
    login(email, password)
      .then((data) => {
        if (data.token) {
          setEmail("");
          setPassword("");
          props.onLogin();
          navigate('/', {replace: true});
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className="entry">
      <h1 className="entry__title">Вход</h1>
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
            id="emaipassword"
            required
            value={password}
            onChange={handlePasswordChange}
          />
        </label>

        <button type="submit" className="entry__form-button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
