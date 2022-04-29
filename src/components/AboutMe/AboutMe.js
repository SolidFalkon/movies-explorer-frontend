import './AboutMe.css';
import photo from '../../images/Photo.png';

function AboutMe(props) {
  return(
    <section className="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__content">
        <img src={photo} className="about-me__photo" alt="Фото"></img>
        <div className="about-me__text-content">
          <h3 className="about-me__name">Артём</h3>
          <p className="about-me__profession">Фронтенд-разработчик, 21 год</p>
          <p className="about-me__text">
            Я&nbsp;родился в&nbsp;городе Кольчугино Владимирской области а&nbsp;живу сейчас живу в&nbsp;Москве, учучь на&nbsp;программной инженерии в&nbsp;МИЭТ.
            Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь футболом и&nbsp;настольными играми. 
            Програмированнием увлекаюсь с&nbsp;16&nbsp;лет. С&nbsp;2019 года работаю в&nbsp;компании ЦИТ &laquo;ВИРТЭКС&raquo;.
          </p>
          <nav className="about-me__navigation">
              <a className="about-me__link" href="https://vk.com/cyberfalconas" target="_blank" rel="noreferrer">VK</a>
              <a className="about-me__link" href="https://github.com/SolidFalkon" target="_blank" rel="noreferrer">Github</a>
          </nav>
        </div>
      </div>
    </section>
  );
}
export default AboutMe;