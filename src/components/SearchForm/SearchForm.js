import './SearchForm.css';
import magnifier from "../../images/search-icon.png";

function SearchForm(props) {

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    props.testPreloader();
  }

  return(
    <section className="search-form">
      <form className="search-form__form">
        <div className='search-form__search-line'>
          <img className="search-form__img" src={magnifier} alt="лупа"></img>
          <input type="text" className="search-form__input" placeholder="Фильм" />
          <button type="submit" className="search-form__button" onClick={handleSubmit}></button>
        </div>
        <div className="search-form__switcher-content">
          <input type="checkbox" className="search-form__switcher"></input>
          <span className="search-form__switcher-description">Короткометражки</span>
        </div>
      </form>
    </section>
  );
}
export default SearchForm;