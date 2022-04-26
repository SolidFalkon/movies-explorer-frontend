import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import './Profile.css'
import {CurrentUserContext} from '../../contexts/CurrentUserContext' 
import { mainApi } from '../../utils/MainApi.js'

function Profile(props) {
  
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('')
  const [nameError, setNameError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState('');
  const [emailErrorText, setEmailErrorText] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [isSucces, setIsSucces] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangeName(e)
  {
    setName(e.target.value)
  }

  React.useEffect(() => {
    if(email === '' || name === '')
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
        setNameErrorText('Имя должно быть больше 1 символа и меньше 31')
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
    if (name === currentUser.name){
      setNameError(true)
      setButtonDisabled(true)
      setNameErrorText('Вы уже используете данное имя')
    }
    if (email === currentUser.email){
      setEmailError(true)
      setEmailErrorText('Вы уже используете данный email')
      setButtonDisabled(true)
    }
  } ,[currentUser.email, currentUser.name, email, name]);

  React.useEffect(() => {
    setIsSucces(false)
  },[email, name]);

  function handleSubmit(e){
    e.preventDefault();
    mainApi.patchNewProfile(name, email).then(data => {
      props.setUser(data)
      setIsSucces(true)
    })
    .catch((err) => {
      console.log(err);
      if (err === 'Ошибка: 409')
      {
        setEmailError(true)
        setEmailErrorText('Данный email уже используется')
        setButtonDisabled(true)
      }
    });
  }

  React.useEffect(() => {
    props.checkPage();
  });
    
  return(
    <main className='profile'>
      <h2 className='profile__title'>Привет, {currentUser.name}</h2>
      <form className="profile__form" onSubmit={handleSubmit}>
        <label className="profile__lable">Имя
          <input
            onChange={handleChangeName}
            className={`profile__input ${nameError ? 'profile__input-error' : ''}`}
            placeholder={currentUser.name}
            required
            id="name"
            name="name"
            type="text"
            value={name}
          />
        </label>
        <span className={`profile__error ${nameError ? 'profile__error_enable' : ''}`}>{nameErrorText}</span>
        <label className="profile__lable">E&#8209;mail
          <input
            className={`profile__input ${emailError ? 'profile__input-error' : ''}`}
            onChange={handleChangeEmail}
            type="email"
            placeholder={currentUser.email}
            id="email"
            name="email"
            value={`${email}`}
            required
          />
        </label>
        <span className={`profile__error ${emailError ? 'profile__error_enable' : ''}`}>{emailErrorText}</span>
        <span className={`profile__succes ${isSucces ? 'profile__succes_enable' : ''}`}>Профиль изменен</span>
        <div className="profile__navigation">
          <button type="submit" className={`profile__edit-btn ${buttonDisabled ? 'profile__edit-btn_disable' : ''}`} disabled={buttonDisabled}>
            Редактировать
          </button>
          <NavLink className="profile__exit-link" onClick={props.onSignOut} to="/" >Выйти из аккаунта</NavLink>
        </div> 
      </form>
    </main>
  );
}

export default Profile;