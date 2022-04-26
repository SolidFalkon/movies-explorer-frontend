import './MoviesCard.css';
import React, { useState } from 'react';

function MoviesCard(props) {
  const [isActive, setActive] = useState(false);
  const [id, setId] = useState('')

  function buttonClick() {
    props.handleSave(props.movie, isActive, id)
    setActive(!isActive);
  }

  React.useEffect(() => {
    setActive(false)
    if (!props.isSaved){
      props.myMovies.map((movie) => {
        if (props.movie.id === movie.movieId)
        {
          setId(movie._id)
          setActive(true)
        }
        return 0;
      })
    }
    else
    {
      setActive(true)
      setId(props.movie._id)
    }
  }, [props.isSaved, props.movie._id, props.movie.id, props.myMovies])

  return(
    <div className="movies-card">
      <a href={props.movie.trailerLink} className='movies-card__link'>
        <div className="movies-card__description">
            <h2 className="movies-card__name">{props.movie.nameRU}</h2>
            <p className="movies-card__time">{props.movie.duration} минут</p>
        </div>
          <img src={props.isSaved ? props.movie.image : `https://api.nomoreparties.co/${props.movie.image.url}`} alt={props.movie.nameRU} className="movies-card__image"/>
      </a>
        <button type="button" className={`movies-card__save-button ${props.isSaved ? 'movies-card__save-button_saved' : isActive ? 'movies-card__save-button_active' : ''}`} onClick={buttonClick}>Сохранить</button>
    </div>
  );
}
export default MoviesCard;