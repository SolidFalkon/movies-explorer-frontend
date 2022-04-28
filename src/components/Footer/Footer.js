import './Footer.css';

function Footer(props) {
  return(
      <footer className={`footer ${props.isForm ? 'footer__inactive' : ''}`}>
          <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
          <div className="footer__content">
            <p className="footer__copyright">&copy; 2020</p>
            <nav className="footer__navigation">
              <a className="footer__link" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
              <a className="footer__link" href="https://github.com/SolidFalkon" target="_blank" rel="noreferrer">Github</a>
              <a className="footer__link" href="https://vk.com/cyberfalconas" target="_blank" rel="noreferrer">VK</a>
            </nav>
          </div> 
      </footer >
  );
}

export default Footer;