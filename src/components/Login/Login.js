import React, {useState} from "react";
import { NavLink } from 'react-router-dom';
import './Login.css'

function Login(props) {

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(false);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function checkValidation(){
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( re.test(email) ) {
      setEmailError(false)
    }
    else {
      setEmailError(true)
      setError(true)
    }
    if(password.length > 6) {
      setPasswordError(false)
    }
    else{
      setPasswordError(true)
      setError(true)
    }
  }

  React.useEffect(() => {
    props.checkPage();
  });

return(
  <main className='login'>
    <div className="login__logo"></div>
    <h2 className='login__title'>Рады видеть!</h2>
    <form className="login__form">
      <label className="login__lable" htmlFor="email">E-mail</label>
      <input
        className={`login__input ${emailError ? 'login__input-error' : ''}`}
        onChange={handleChangeEmail}
        type="email"
        placeholder="pochta@yandex.ru"
        id="email"
        name="email"
        value={`${email}`}
        required
      />
      <label className="login__lable" htmlFor="password">Пароль</label>
      <input
        className={`login__input ${passwordError ? 'login__input-error' : ''}`}
        onChange={handleChangePassword}
        placeholder="Пароль"
        required
        id="password"
        name="password"
        type="password"
        value={`${password}`}
        minLength="6"
      />
      <span className={`login__error ${error ? 'login__error_enable' : ''}`}>Что-то пошло не так...</span>
      <div className="login__navigation">
        <button type="submit" className="login__btn" onClick={checkValidation}>
          Войти
        </button>
        <span className="login__link-description">Ещё не зарегистрированы? 
          <NavLink className="login__link" to="/" >Регистрация</NavLink>
        </span>
      </div> 
    </form>
  </main>
);
}

export default Login;