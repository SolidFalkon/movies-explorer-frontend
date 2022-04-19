import { NavLink } from 'react-router-dom';
import {useState} from "react";
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header(props) {

  const [openPopup, setOpenPopup] = useState(false);

  function openNavigation(){
    setOpenPopup(true)
  }
  function closeNavigation(){
    setOpenPopup(false)
  }

  return(
    <header className={`header ${props.isAutorizationForm ? 'header_inactive' : ''}`}>
      <Navigation closeNavigation={closeNavigation} isOpen={openPopup}/>
      <NavLink className="header__logo" to="/"></NavLink>
      {props.isMain ? 
        <nav className="header__navigation">
          <NavLink className="header__link header__link_color_white" to="/signup">Регистрация</NavLink>
          <NavLink className="header__link header__link_color_green" to="/signin">Войти</NavLink>
        </nav>
      :
      <div>
        <nav className="header__navigation header__navigation_page_movies">
          <NavLink className="header__link header__link_active" to="/movies">Фильмы</NavLink>
          <NavLink className="header__link" to="/saved-movies">Сохранённые фильмы</NavLink>
          <NavLink className="header__link header__link_color_grey" to="/profile">Аккаунт</NavLink>
        </nav>
        <button className='header__navigation-btn' onClick={openNavigation}></button>
      </div>
    }  
    </header>
  );
}

export default Header;