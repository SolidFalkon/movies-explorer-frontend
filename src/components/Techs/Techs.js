import './Techs.css';

function Techs(props) {
  return(
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <h3 className="techs__subtitle">7 технологий</h3>
      <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <div className="techs__buttons">
        <button type="button" className="techs__button">HTML</button>
        <button type="button" className="techs__button">CSS</button>
        <button type="button" className="techs__button">JS</button>
        <button type="button" className="techs__button">React</button>
        <button type="button" className="techs__button">Git</button>
        <button type="button" className="techs__button">Express.js</button>
        <button type="button" className="techs__button">mongoDB</button>
      </div>
    </section>
  );
}
export default Techs;