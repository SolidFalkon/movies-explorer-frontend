import './Promo.css';

function Promo(props) {
  return(
    <section className="promo">
      <div className='promo__content'>
        <div className='promo__text-content'>
          <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className="promo__text">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>
        <div className="promo__image"></div>
      </div>
      <button type="button" className="promo__button">Узнать больше</button>
    </section>
  );
}
export default Promo;