import React from "react";

function Login(props) {
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
    props.onLogin(email, password);
    setEmail("");
    setPassword("");
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
