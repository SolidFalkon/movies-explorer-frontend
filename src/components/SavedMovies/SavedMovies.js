import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { mainApi } from '../../utils/MainApi.js'
import React, {useState} from "react";

function SavedMovies(props) {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [isFind, setFind] = useState(false);
  const [isShort, setIsShort] = useState(false);
  const [myMovies, setMyMovies] = useState([])

  React.useEffect(() => {
    mainApi.getInitialCards().then((res) => {
      setMyMovies(res)
    })
    .catch((err) => {
      console.log(err);
    })
  } ,[movies]);

  React.useEffect(() => {
    props.checkPage();
  },[props]);

  React.useEffect(() => {
    if(myMovies.length > 0)
    {
      let arr = [];
      setMovieName(movieName)
      setIsShort(isShort)
      myMovies.map((movie) => checkMovie(movie))
      if (arr.length === 0)
      {
        setFind(false)
      }
      else{
        setFind(true)
      }
      function checkMovie(movie){
        if(isShort){
          if(movie.nameRU.toLowerCase().includes(movieName.toLowerCase()) && movie.duration <= 40){
            arr.push(movie);
          }
        }
        else
        {
          if(movie.nameRU.toLowerCase().includes(movieName.toLowerCase())){
            arr.push(movie);
          }
        }
        setMovies(arr)
      }
    }
  },[isShort, movieName, myMovies, props.myMovies])

  function startSearch(movieName, isShort)
  {
    setMovieName(movieName);
    setIsShort(isShort);
  }

  return(
    <main className='movies'>
      <SearchForm isSaved={true} startSearch={startSearch} />
      <MoviesCardList firstFind={true} isFind={isFind} setMovies={setMovies} movies={movies} isSaved={true} windowWidth={props.windowWidth} myMovies={myMovies}/>
    </main>
  );
}

export default SavedMovies;