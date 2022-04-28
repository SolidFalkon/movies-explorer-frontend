import React, {useState} from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import './Login.css'

function Login(props) {

  let navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true);

  React.useEffect(() => {
    if (props.loggedIn) 
    {
      navigate('/movies')
    }
  },[navigate, props.loggedIn]);

  //Валидация
  React.useEffect(() => {
    setLoginError(false)
    if(password === '' || email === '')
    {
      setButtonDisabled(true)
    }
    else{
      setButtonDisabled(false)
    }
    //Емаил
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email !== ''){
      if ( re.test(email)) {
        setEmailError(false)
      }
      else{
        setButtonDisabled(true)
        setEmailError(true)
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
  } ,[email, password]);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onSubmit({
        email,
        password,
    });
    setLoginError(true)
  }

  React.useEffect(() => {
    props.checkPage();
  });

return(
  <main className='login'>
    <NavLink className="login__logo" to="/"></NavLink>
    <h2 className='login__title'>Рады видеть!</h2>
    <form className="login__form" onSubmit={handleSubmit}>
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
      <span className={`register__error ${emailError ? 'register__error_enable' : ''}`}>Введите email адрес</span>
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
        minLength="8"
      />
     <span className={`register__error ${passwordError ? 'register__error_enable' : ''}`}>Пароль должен содержать больше 7 символов</span>
     <span className={`register__error ${loginError ? 'register__error_enable' : ''}`}>Не удалось войти</span>
      <div className="login__navigation">
        <button type="submit" className={`login__btn ${buttonDisabled ? 'login__btn_disable' : ''}`} disabled={buttonDisabled}>
          Войти
        </button>
        <span className="login__link-description">Ещё не зарегистрированы? 
          <NavLink className="login__link" to="/signup" >Регистрация</NavLink>
        </span>
      </div> 
    </form>
  </main>
);
}

export default Login;