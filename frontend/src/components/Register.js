import { useForm } from "../hooks/useForm";
import { Link } from "react-router-dom";


const Register = ({ onRegister, onInfoTooltipClick }) => {
  const { formValue, handleChange } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formValue);
    onInfoTooltipClick();
  }

  return (
    <>
      <div className="check-in">
        <h1 className="check-in__title">Регистрация</h1>
        <form className="check-in__form" onSubmit={handleSubmit}>
          <input
            className="check-in__input"
            name="email"
            placeholder="Email"
            type="email"
            minLength="5"
            maxLength="40"
            onChange={handleChange}
            value={formValue.email}
            required
          ></input>
          <input
            className="check-in__input"
            name="password"
            placeholder="Пароль"
            type="password"
            minLength="2"
            maxLength="100"
            onChange={handleChange}
            value={formValue.password}
            required
          ></input>
          <button className="check-in__submit">Зарегистрироваться</button>
          <Link className="check-in__entry" to="/sign-in">
            Уже зарегистрированы? Войти
          </Link>
        </form>
      </div>
    </>
  );
};

export default Register;