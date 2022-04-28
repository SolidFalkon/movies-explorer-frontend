import React, { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import './Register.css'

function Register(props) {

  let navigate = useNavigate();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  React.useEffect(() => {
    if (props.loggedIn) 
    {
      navigate('/movies')
    }
  },[navigate, props.loggedIn]);

  //Валидация
  React.useEffect(() => {
    if(password === '' || email === '' || name === '')
    {
      setButtonDisabled(true)
    }
    else
    {
      setButtonDisabled (false)
    }
    //Имя
    if (name !== ''){
      if(name.length < 2 || name.length > 30)
      {
        setNameError(true)
        setButtonDisabled(true)
      }
      else{
        setNameError(false)
      }
    }
    //Емаил
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email !== ''){
      if ( re.test(email)) {
        setEmailError(false)
      }
      else{
        setEmailError(true)
        setButtonDisabled(true)
        setEmailErrorText('Введите email адрес')
      }
    }
    //Пароль
    if (password !== ''){
      if(password.length > 7) {
        setPasswordError(false)
      }
      else{
        setButtonDisabled(true)
        setPasswordError(true)
      }
    }
  } ,[email, password, name]);


  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleChangeName(e){
    setName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit({
        name,
        email,
        password,
    });
    setEmailErrorText('Данный email уже используется')
    setEmailError(true)
  }

  React.useEffect(() => {
    props.checkPage();
  });

return(
  <main className='register'>
  <NavLink className="register__logo" to="/"></NavLink>
    <h2 className='register__title'>Добро пожаловать!</h2>
    <form className="register__form" onSubmit={handleSubmit}>
      <label className="register__lable" htmlFor="email">Имя</label>
      <input
        onChange={handleChangeName}
        className={`register__input ${nameError ? 'register__input-error' : ''}`}
        placeholder="Имя"
        required
        id="name"
        name="name"
        type="text"
        value={name}
      />
      <span className={`register__error ${nameError ? 'register__error_enable' : ''}`}>Имя должно быть больше 1 символа и меньше 31</span>
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
      <span className={`register__error ${emailError ? 'register__error_enable' : ''}`}>{emailErrorText}</span>
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
        minLength="8"
      />
       <span className={`register__error ${passwordError ? 'register__error_enable' : ''}`}>Пароль должен содержать больше 7 символов</span>
      <div className="register__navigation">
        <button type="submit" className={`register__btn ${buttonDisabled ? 'register__btn_disable' : ''}`} disabled={buttonDisabled}>
          Зарегистрироваться
        </button>
        <span className="register__link-description">Уже зарегистрированы? 
          <NavLink className="register__link" to="/signin" >Войти</NavLink>
        </span>
      </div> 
    </form>
  </main>
);
}

export default Register;