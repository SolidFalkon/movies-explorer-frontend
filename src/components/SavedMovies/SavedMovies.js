import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import React, {useState} from "react";

function SavedMovies(props) {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [isShort, setIsShort] = useState(false);

  React.useEffect(() => {
    setMovies(props.myMovies)
    props.checkPage();
  },[props]);

  React.useEffect(() => {
    let arr = [];
    setMovieName(movieName)
    setIsShort(isShort)
    props.myMovies.map((movie) => checkMovie(movie))
    function checkMovie(movie){
      if(isShort){
        if(movie.nameRU.includes(movieName) && movie.duration <= 40){
          arr.push(movie);
        }
      }
      else
      {
        if(movie.nameRU.includes(movieName)){
          arr.push(movie);
        }
      }
      setMovies(arr)
    }
  },[isShort, movieName, props.myMovies])

  function startSearch(movieName, isShort)
  {
    setMovieName(movieName);
    setIsShort(isShort);
  }

  return(
    <main className='movies'>
      <SearchForm isSaved={true} startSearch={startSearch} />
      <MoviesCardList setMovies={props.setMovies} movies={movies} isSaved={true} windowWidth={props.windowWidth} myMovies={props.myMovies}/>
    </main>
  );
}

export default SavedMovies;