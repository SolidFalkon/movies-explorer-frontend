import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import './Register.css'

function Register(props) {

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
  <main className='register'>
    <div className="register__logo"></div>
    <h2 className='register__title'>Добро пожаловать!</h2>
    <form className="register__form">
      <label className="register__lable" for="email">Имя</label>
      <input
        className="register__input"
        placeholder="Имя"
        required
        id="name"
        name="name"
        type="text"
      />
      <label className="register__lable" htmlFor="email">E-mail</label>
      <input
        className={`register__input ${emailError ? 'register__input-error' : ''}`}
        onChange={handleChangeEmail}
        type="email"
        placeholder="pochta@yandex.ru"
        id="email"
        name="email"
        value={`${email}`}
        required
      />
      <label className="register__lable" htmlFor="password">Пароль</label>
      <input
        className={`register__input ${passwordError ? 'register__input-error' : ''}`}
        onChange={handleChangePassword}
        placeholder="Пароль"
        required
        id="password"
        name="password"
        type="password"
        value={`${password}`}
        minLength="6"
      />
       <span className={`register__error ${error ? 'register__error_enable' : ''}`}>Что-то пошло не так...</span>
      <div className="register__navigation">
        <button type="submit" className="register__btn" onClick={checkValidation}>
          Зарегистрироваться
        </button>
        <span className="register__link-description">Уже зарегистрированы? 
          <NavLink className="register__link" to="/" >Войти</NavLink>
        </span>
      </div> 
    </form>
  </main>
);
}

export default Register;