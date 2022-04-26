import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader"

import React, {useState} from "react";

function Movies(props) {
  
  const [movies, setMovies] = useState([]);
  const [isFind, setFind] = useState(false);
  const [onPreloader, setOnPreloader] = useState(false);
  const [movieName, setMovieName] = useState('');
  const [isShort, setIsShort] = useState(false);
  const [firstFind, setFirstFind] = useState(false)
  
  React.useEffect(() => {
    props.checkPage();
  } ,[props]);

  React.useEffect(() => {
    let arr = [];
    if (onPreloader){
      props.movies.map((movie) => checkMovie(movie))
      if (arr.length === 0)
      {
        setOnPreloader(false)
        setFind(false)
      }
      setMovies(arr)
    }
    function checkMovie(movie){
      if(isShort){
        if(movie.nameRU.includes(movieName) && movie.duration <= 40){
          setFind(true)
          setOnPreloader(false)
          arr.push(movie);
        }
      }
      else
      {
        if(movie.nameRU.includes(movieName)){
          setOnPreloader(false)
          setFind(true)
          arr.push(movie);
        }
      }
    }
  } ,[isShort, movieName, onPreloader, props.movies]);

  

  function startSearch(movieName, isShort)
  {
    setMovieName(movieName);
    setIsShort(isShort);
    setOnPreloader(true)
    setFirstFind(true)
  }

  return(
    <main className='movies'>
      <SearchForm startSearch={startSearch}/>
      {onPreloader ? <Preloader/> : <></>}
      <MoviesCardList setMovies={props.setMovies} firstfind={firstFind} isSaved={false} windowWidth={props.windowWidth} myMovies={props.myMovies} movies={movies} isFind={isFind}/>
      </main>
  );
}

export default Movies;