import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import React, {useState} from "react";

function Movies(props) {
  
  React.useEffect(() => {
    props.checkPage();
  });

//Для теста прелоадера
  const [isFind, setFind] = useState(true);
  function testPreloader() {
    setFind(false)
    setTimeout(() => {setFind(true)} ,3000);
  };
//
  return(
    <main className='movies'>
      <SearchForm testPreloader={testPreloader} />
      {isFind ? <MoviesCardList isSaved={false} windowWidth={props.windowWidth}/> : <Preloader />}
    </main>
  );
}

export default Movies;