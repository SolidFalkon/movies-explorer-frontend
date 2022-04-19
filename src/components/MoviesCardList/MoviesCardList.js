import React, {useState} from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
//для разнообразия картинок
import img1 from '../../images/img1.jpg';
import img2 from "../../images/img2.jpg";
import img3 from"../../images/img3.jpg";
import img4 from"../../images/img4.jpg";
import img5 from"../../images/img5.jpg";
import img6 from"../../images/img6.jpg";
import img7 from"../../images/img7.jpg";
import img8 from"../../images/img8.jpg";
import img9 from"../../images/img9.jpg";
import img10 from"../../images/img10.jpg";
import img11 from"../../images/img11.jpg";
import img12 from"../../images/img12.jpg";
//
import './MoviesCardList.css';
function MoviesCardList(props) {

  //для разнообразия картинок
  let images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
  ];
//
  const [maxCards, setMaxCards] = useState(12);
  
  React.useEffect(() => {
    function handleSetCards(i) {
      setMaxCards(i);
    }
    if (props.windowWidth < 790)
    {
      handleSetCards(4);
    }
    else if (props.windowWidth < 1200)
    {
      handleSetCards(8);
    }
    else
    {
      handleSetCards(12);
    };
  });

  return(
    <section className="movies-card-list">
      <div className="movies-card-list__cards">
        {props.isSaved 
        ? 
        images.slice(0, 3).map((img) => (
          <MoviesCard img={img} isSaved={props.isSaved}/>
        ) ) 
        : 
        images.slice(0, maxCards).map((img) => (
          <MoviesCard img={img} isSaved={props.isSaved}/>
        ) )}
      </div>
      <button className={`movies-card-list__more-btn ${(props.isSaved )? 'movies-card-list__more-btn_disable' : ''}`}>Ещё</button>
    </section>
  );
}
export default MoviesCardList;