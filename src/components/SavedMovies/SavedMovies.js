import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import React from "react";

function SavedMovies(props) {
  React.useEffect(() => {
    props.checkPage();
  });

  return(
    <main className='movies'>
      <SearchForm />
      <MoviesCardList isSaved={true} windowWidth={props.windowWidth}/>
    </main>
  );
}

export default SavedMovies;