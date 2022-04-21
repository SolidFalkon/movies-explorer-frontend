import './MoviesCard.css';
import { useState } from 'react';

function MoviesCard(props) {
  const [isActive, setActive] = useState(false);
  function buttonClick() {
    setActive(!isActive);
  }
  
  return(
    <div className="movies-card">
      <div className="movies-card__description">
          <h2 className="movies-card__name">В погоне за Бенкси</h2>
          <p className="movies-card__time">27 минут</p>
      </div>
        <img src={props.img} alt="Картинка" className="movies-card__image"/>
        <button type="button" className={`movies-card__save-button ${props.isSaved ? 'movies-card__save-button_saved' : isActive ? 'movies-card__save-button_active' : ''}`} onClick={buttonClick}>Сохранить</button>
    </div>
  );
}
export default MoviesCard;