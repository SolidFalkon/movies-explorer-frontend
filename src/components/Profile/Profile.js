import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import './Profile.css'

function Profile(props) {
  
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = useState(false);

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function checkValidationEmail(e){
    e.preventDefault(false);
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( re.test(email) ) {
      setEmailError(false)
    }
    else {
      setEmailError(true)
    }
  }


  React.useEffect(() => {
    props.checkPage();
  });
    
  return(
    <main className='profile'>
      <h2 className='profile__title'>Привет, Артём!</h2>
      <form className="profile__form">
        <label className="profile__lable">Имя<input type="text" placeholder="Артём" className="profile__input" /></label>
        <label className="profile__lable">E&#8209;mail
          <input 
            onChange={handleChangeEmail}
            type="email"
            placeholder="pochta@yandex.ru"
            className={`profile__input ${emailError ? 'profile__input-error' : ''}`}
            id="email"
            name="email"
            value={`${email}`}
          />
        </label>
        <span className={`profile__error ${emailError ? 'profile__error_enable' : ''}`}>Что-то пошло не так...</span>
        <div className="profile__navigation">
          <button type="submit" className="profile__edit-btn" onClick={checkValidationEmail}>
            Редактировать
          </button>
          <NavLink className="profile__exit-link" to="/" >Выйти из аккаунта</NavLink>
        </div> 
      </form>
    </main>
  );
}

export default Profile;