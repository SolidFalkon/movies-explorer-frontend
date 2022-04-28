import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader"
import { mainApi } from '../../utils/MainApi.js'

import React, {useState} from "react";

function Movies(props) {
  
  const [movies, setMovies] = useState([]);
  const [isFind, setFind] = useState(false);
  const [onPreloader, setOnPreloader] = useState(false);
  const [movieName, setMovieName] = useState('');
  const [isShort, setIsShort] = useState(false);
  const [firstFind, setFirstFind] = useState(false)
  const [myMovies, setMyMovies] = useState([])

  React.useEffect(() => {
    mainApi.getInitialCards().then((res) => {
      setMyMovies(res)
    })
    .catch((err) => {
      console.log(err);
    })
  } ,[myMovies]);
  
  
  React.useEffect(() => {
    props.checkPage();
  } ,[props]);

  React.useEffect(() => {
    let arr = [];
    if (onPreloader && props.movies.length > 0){
      props.movies.map((movie) => checkMovie(movie))
      if (arr.length === 0)
      {
        localStorage.setItem("searchName", movieName);
        localStorage.setItem("isShort", isShort)
        setOnPreloader(false)
        setFind(false)
      }
      setMovies(arr)
    }
    function checkMovie(movie){

      if(isShort){
        if(movie.nameRU.toLowerCase().includes(movieName.toLowerCase()) && movie.duration <= 40){
          localStorage.setItem("searchName", movieName);
          localStorage.setItem("isShort", isShort)
          setFind(true)
          setOnPreloader(false)
          arr.push(movie);
        }
      }
      else
      {
        if(movie.nameRU.toLowerCase().includes(movieName.toLowerCase())){
          localStorage.setItem("searchName", movieName)
          localStorage.setItem("isShort", isShort)
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
      <SearchForm startSearch={startSearch} isSaved={false}/>
      {onPreloader ? <Preloader/> : <></>}
      <MoviesCardList setMovies={setMovies} firstFind={firstFind} isSaved={false} windowWidth={props.windowWidth} myMovies={myMovies} movies={movies} isFind={isFind}/>
      </main>
  );
}

export default Movies;