import './Footer.css';

function Footer(props) {
  return(
      <footer className={`footer ${props.isForm ? 'footer__inactive' : ''}`}>
          <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
          <div className="footer__content">
            <p className="footer__copyright">&copy; 2020</p>
            <nav className="footer__navigation">
              <a className="footer__link" href="https://practicum.yandex.ru">Яндекс.Практикум</a>
              <a className="footer__link" href="https://github.com/SolidFalkon">Github</a>
              <a className="footer__link" href="https://vk.com/cyberfalconas">VK</a>
            </nav>
          </div> 
      </footer >
  );
}

export default Footer;