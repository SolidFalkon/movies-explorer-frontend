import './Navigation.css';
import { NavLink } from 'react-router-dom';

function Navigation(props) {
  return(
      <div className={`navigation ${props.isOpen ? 'navigation_enable' : ''}`}>
        <div className='navigation__content'>
          <button className='navigation__close' onClick={props.closeNavigation}></button>
          <nav className="navigation__links">
            <NavLink className="navigation__link" to="/">Главная</NavLink>
            <NavLink className="navigation__link navigation__link_active" to="/movies">Фильмы</NavLink>
            <NavLink className="navigation__link" to="/saved-movies">Сохранённые фильмы</NavLink>
          </nav>
          <NavLink className="navigation__accaunt-link" to="/profile">Аккаунт</NavLink>
        </div>
      </div>
  );
}

export default Navigation;