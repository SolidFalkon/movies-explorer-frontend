import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header.js'
import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer.js';
import './App.css';
import React, { useState } from 'react';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import Error404 from '../Error404/Error404.js'

function App() {
  const [isMain, setMain] = useState(false);
  const [isAutorizationForm, setAutorizationForm] = useState(false)
  const [isForm, setForm] = useState(false);

  
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);

  React.useEffect(() => {
    function handleResize() {
      setWindowInnerWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    console.log()
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

  return (
    <div className="App">
        <Header isMain={isMain} isAutorizationForm={isAutorizationForm}/>
          <Routes>
            <Route path="/" element={<Main checkPage={checkMain} /> }/>
            <Route path="/movies" element={<Movies checkPage={checkMovies}  windowWidth={windowInnerWidth}/>} />
            <Route path="/saved-movies" element={<SavedMovies checkPage={checkMovies} windowWidth={windowInnerWidth}/>} />
            <Route path="/profile" element={<Profile checkPage={checkForm} />}/>
            <Route path="/signup" element={<Register checkPage={checkAutorizationForm} />} />
            <Route path="/signin" element={<Login checkPage={checkAutorizationForm} />} />
            <Route path="/*" element={<Error404 checkPage={checkAutorizationForm} />} />
          </Routes>
        <Footer isForm={isForm}/>
    </div>
  );
}

export default App;
