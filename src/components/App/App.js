import { Route, Routes, useNavigate} from 'react-router-dom';
import Header from '../Header/Header.js'
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Footer from '../Footer/Footer.js';
import './App.css';
import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import { moviesApi } from '../../utils/MoviesApi.js'
import { mainApi } from '../../utils/MainApi.js'
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Error404 from '../Error404/Error404.js'


function App() {
  const [isMain, setMain] = useState(false);
  const [isAutorizationForm, setAutorizationForm] = useState(false)
  const [isForm, setForm] = useState(false);
  const [allMovies, setAllMovies] = React.useState([]);
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setUser] = useState({});
  const [myMovies, setMyMovies] = React.useState([]);
  
  const navigate = useNavigate();
  //Получение сохраненных карточек
  React.useEffect(() => {
    if(loggedIn){
      mainApi.getInitialCards().then((res) => {
        setMyMovies(res)
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },[loggedIn]);

  // Логин
  useEffect(() => {
    if (localStorage.getItem("token")) {
      mainApi.checkToken().then((res) => {
        if (res) {
          setUser(res);
          setLoggedIn(true);
        }
        else 
        {
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },[]);
  
  useEffect(() => {
    if (loggedIn){
      Promise.all([mainApi.getInitialProfile(), moviesApi.getInitialMovies()])
        .then(([userData, allMovies]) => {
          setUser(userData);
          setAllMovies(allMovies);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleLogin(inputs) {
    mainApi.onLogin(inputs.email, inputs.password).then(data => {
      if(data._id){
        localStorage.setItem('token', data._id);
        setLoggedIn(true);
        navigate('/movies');
      }
    })
      .catch((err) => {;
        console.log(err);
      });
  };
  //
  // Регистрация
  function handleRegistration(inputs) {
    mainApi.registerNewProfile(inputs.name ,inputs.email, inputs.password).then(data => {
      if(data){
        navigate('/signin');
      }
    })
      .catch((err) => {
        console.log(err);
      });
  };
  //
  React.useEffect(() => {
    function handleResize() {
      setWindowInnerWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  function checkAutorizationForm(){
    setAutorizationForm(true);
    setMain(false)
    setForm(true)
  }
  function checkMain(){
    setAutorizationForm(false);
    setMain(true);
    setForm(false)
  }
  function checkForm(){
    setAutorizationForm(false);
    setMain(false);
    setForm(true)
  }
  function checkMovies(){
    setAutorizationForm(false);
    setMain(false);
    setForm(false)
  }
  function onSignOut(){
    localStorage.removeItem('token');
    setLoggedIn(false)
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser} >
          <Header isMain={isMain} isAutorizationForm={isAutorizationForm} loggedIn={loggedIn}/>
            <Routes>
              <Route path="/" element={<Main checkPage={checkMain}/>}/>
              <Route path="/movies" element={
                <ProtectedRoute navigate={navigate}>
                  <Movies setMovies={setMyMovies} myMovies={myMovies} checkPage={checkMovies} movies={allMovies}  windowWidth={windowInnerWidth}/>
                </ProtectedRoute>       
              } 
              />
              <Route path="/saved-movies" element={
                <ProtectedRoute navigate={navigate}>
                  <SavedMovies setMovies={setMyMovies} myMovies={myMovies} checkPage={checkMovies} movies={allMovies} windowWidth={windowInnerWidth}/>
                </ProtectedRoute>
              } 
              />
              <Route path="/profile" element={
                <ProtectedRoute navigate={navigate}>
                  <Profile checkPage={checkForm} onSignOut={onSignOut} setUser={setUser}/>
                </ProtectedRoute>
              }
              />
              <Route path="/signup" element={<Register checkPage={checkAutorizationForm} onSubmit={handleRegistration}/>} />
              <Route path="/signin" element={<Login checkPage={checkAutorizationForm} onSubmit={handleLogin}/>} />
              <Route path="/*" element={<Error404 checkPage={checkAutorizationForm} />} />
            </Routes>
          <Footer isForm={isForm}/>
        </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
