import './AboutProject.css';
import { useState } from 'react';

function AboutProject(props) {
  
  const [isFirstWeek, setFirstWeek] = useState(true);

  function changeWeek(e, i){
    if (i === 1)
    {
      setFirstWeek(true);
    }
    else
    {
      setFirstWeek(false)
    }
  }

  return(
    <section className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__text-content">
        <div className="about-project__paragraph">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__paragraph">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__buttons">
        <button type="button" className={`about-project__button ${isFirstWeek ? 'about-project__button_active' : ''}`} onClick={(e) => {changeWeek(e, 1)}}>1 неделя</button>
        <button type="button" className={`about-project__button ${isFirstWeek ? '' : 'about-project__button_active'}`} onClick={(e) => {changeWeek(e, 2)}}>4 недели</button>
        <p className="about-project__button-descrition">Back-end</p>
        <p className="about-project__button-descrition">Front-end</p>
      </div>
    </section>
  );
}
export default AboutProject;