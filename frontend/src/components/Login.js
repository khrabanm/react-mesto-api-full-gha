import { useForm } from "../hooks/useForm.js";

export default function Login({ onLogin }) {
  const { formValue, handleChange } = useForm({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    onLogin(formValue);
  }

  return (
    <div className="check-in">
      <h1 className="check-in__title">Вход</h1>
      <form className="check-in__form" onSubmit={handleSubmit}>
        <input
          className="check-in__input"
          type="email"
          placeholder="Email"
          name="email"
          minLength="5"
          maxLength="40"
          value={formValue.email}
          onChange={handleChange}
          required
        ></input>
        <input
          className="check-in__input"
          type="password"
          placeholder="Пароль"
          name="password"
          minLength="2"
          maxLength="100"
          value={formValue.password}
          onChange={handleChange}
          required
        ></input>
        <button className="check-in__submit">Войти</button>
      </form>
    </div>
  );
}