import React from 'react';
import { mainApi } from '../../utils/MainApi.js'
import { Navigate } from "react-router-dom";

function ProtectedRoute(props){

 

  function getAuth(){
    if (localStorage.getItem("token")) {
      mainApi.checkToken().then((res) => {
        if (!res){
          props.navigate('/')
        }
      })
      .catch((err) => {
        console.log(err);
      });
      return true
    } 
    else{
      return false
    }
  }

  let loggedIn = getAuth()

  return (
    loggedIn ? props.children : <Navigate to="/" />
    )
  }

export default ProtectedRoute;