import './SearchForm.css';
import magnifier from "../../images/search-icon.png";
import React, {useState} from 'react'

function SearchForm(props) {

  const [movieName, setMovieName] = useState('');
  const [moiveNameError, setMoiveNameError] = useState(false);
  const [isShort, setIsShort] = useState(false)
  
  React.useEffect(() => {
    let isShort;
    let movieName;
    if (localStorage.getItem("searchName") && (!props.isSaved))
    { 
      movieName = (localStorage.getItem('searchName'))
      setMovieName(movieName)
      if (localStorage.getItem('isShort') === 'false')
      {
        isShort = (false)
        setIsShort(isShort)
      }
      else{
        isShort = (true)
        setIsShort(isShort)
      }
      props.startSearch(movieName, isShort);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleMoiveName(e) {
    setMovieName(e.target.value);
  }

  function checkShort(e){
    if(e.target.checked === true)
    {
      setIsShort(true)
    }
    else
    {
      setIsShort(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault(false);
    
    if (movieName === '')
    {
      if (props.isSaved)
      {
        props.startSearch('', isShort);
      }
      else
      {
        setMoiveNameError(true)
      }
    }
    else
    {
      props.startSearch(movieName, isShort);
    }
  }

  return(
    <section className="search-form">
      <form className="search-form__form">
        <div className='search-form__search-line'>
          <img className="search-form__img" src={magnifier} alt="лупа"></img>
          <input 
            type="text"
            className={`search-form__input ${moiveNameError ? 'search-form__input-error' : ''}`}
            placeholder={`${moiveNameError ? 'Нужно ввести ключевое слово' : 'Фильм'}`}
            onChange={handleMoiveName}
            value={`${movieName}`}
            required/>
          <button type="submit" className="search-form__button" onClick={handleSubmit}></button>
        </div>
        <div className="search-form__switcher-content">
          <input type="checkbox" className="search-form__switcher" checked={isShort} onChange={checkShort}></input>
          <span className="search-form__switcher-description">Короткометражки</span>
        </div>
      </form>
    </section>
  );
}
export default SearchForm;