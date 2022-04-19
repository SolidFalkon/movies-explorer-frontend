import React from "react";
import { useNavigate } from 'react-router-dom';
import './Error404.css';

function Error404(props) {

  let navigate = useNavigate();

  React.useEffect(() => {
    props.checkPage();
  });

return(
  <main className='error404'>
    <h1 className="error404__title">404</h1>
    <p className="error404__text">Страница не найдена</p>
    <button className="error404__btn" onClick={() => navigate(-1)} >Назад</button>
  </main>
);
}

export default Error404;