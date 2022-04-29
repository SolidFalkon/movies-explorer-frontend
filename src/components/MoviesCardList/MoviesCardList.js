import React, {useState} from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import { mainApi } from '../../utils/MainApi.js'
import './MoviesCardList.css';
function MoviesCardList(props) {


  const [maxCards, setMaxCards] = useState(12);
  const [moreCards, setMoreCards] = useState(0);
  const [moreButton, setMoreButton] = useState(true)
  
  React.useEffect(() => {
    function handleSetCards(i) {
      setMaxCards(i);
    }
    if (props.windowWidth < 790)
    {
      handleSetCards(4+moreCards);
    }
    else if (props.windowWidth < 1200)
    {
      handleSetCards(8+moreCards);
    }
    else
    {
      handleSetCards(12+moreCards);
    };
    if (props.movies.length < maxCards || props.movies.length === maxCards)
    {
      setMoreButton(false);
    }
    else
    {
      setMoreButton(true)
    }
  },[maxCards, moreCards, props, props.movies.length, props.windowWidth]);

  function handleMore(){
    if (props.windowWidth < 1200)
    {
      setMoreCards(moreCards+2);
    }
    else
    {
      setMoreCards(moreCards+3);
    }
  }
  function handleSave(movie, isActive, id){
    if (!isActive)
    {
      mainApi.saveMovie(movie)
      .then(() => {
        props.setMovies();
      })
        .catch((err) => {
          console.log(err);
        });
    }
    else 
    {
      mainApi.deleteCard(id)
      .then(() => {
        props.setMovies();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
  return(
    <section className="movies-card-list">
      <div className="movies-card-list__cards">
        {props.movies.slice(0, maxCards).map((movie) => (
          <MoviesCard handleSave={handleSave} movie={movie} isSaved={props.isSaved} myMovies={props.myMovies}/>
        ) )}
        {props.firstFind ? <p className={`movies-card-list__error ${props.isFind ? '' : 'movies-card-list__error_active'}`}>Ничего не найдено</p>
        : <></>}
      </div>
      <button className={`movies-card-list__more-btn ${moreButton ? '' : 'movies-card-list__more-btn_disable'}`} onClick={handleMore}>Ещё</button>
    </section>
  );
}
export default MoviesCardList;