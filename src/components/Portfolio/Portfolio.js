import './Portfolio.css';

function Portfolio(props) {
  return(
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <nav className="portfolio__navigation">
          <a className="portfolio__link" href="https://github.com/SolidFalkon/how-to-learn" target="_blank" rel="noreferrer"><p className="portfolio__link-text">Статичный сайт</p><p className="portfolio__link-img">↗</p></a>
          <a className="portfolio__link" href="https://github.com/SolidFalkon/russian-travel" target="_blank" rel="noreferrer"><p className="portfolio__link-text">Адаптивный сайт</p><p className="portfolio__link-img">↗</p></a>
          <a className="portfolio__link" href="https://github.com/SolidFalkon/react-mesto-api-full" target="_blank" rel="noreferrer"><p className="portfolio__link-text">Одностраничное приложение</p><p className="portfolio__link-img">↗</p></a>
      </nav>
    </section>
  );
}
export default Portfolio;