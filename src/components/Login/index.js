import './style.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { db, firebaseApp } from '../../firebase';
import {useHistory} from 'react-router-dom'
import setUser from '../../reducers/user'//action creator

function Login(){

  const[email, setEmail] = useState();
  const[pwd, setPwd] = useState();
  const[success, setSuccess] = useState();
  const[error, setError] = useState("");
  let history = useHistory();
  const dispatch = useDispatch();


  const changeHandler = (e)=>{
    switch(e.target.name){
      case 'email':
        setEmail(e.target.value)
        break;
      case 'pwd':
        setPwd(e.target.value)
        break;
    }
  }
  const signinHandler = () => {
    console.log("email",email)
    console.log("pwd",pwd)
    debugger;
  firebaseApp.auth().signInWithEmailAndPassword(email, pwd)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log("user",user)
    dispatch(setUser(email));
    history.replace('/');
    // ...
  })
  .catch((error) => {
    console.log("error",error.code)
    var errorCode = error.code;
    var errorMessage = error.message;
  });

  }


  return(
    <div className="recruit">
      <div className="apply_title">Login</div>
      <div  align="left" className="userid">email</div>
                <input  onChange={changeHandler} value={email} name="email" className="userid-input" type="text"/>
      <div  align="left" className="userid">pwd</div>
                <input  onChange={changeHandler} value={pwd} name="pwd" className="userPassword-input" type="text"/>
      <button className = 'submit' onClick={signinHandler}>login</button>
      
        
          {/* <Grid align="center"
                justify="center"
                direction="column"
                className="format"  
                alignItems="center" 
                justify="center">
            <Grid item xs={5} alignItems="center" justify="center">
              <div className="blank"></div>
              <Paper className="titlePaper" >
                <div className="apply_title">Login</div>
              </Paper>
              <div className="blank1"></div>
              <Paper >
              <div  align="left" className="userid">email</div>
                <input  onChange={changeHandler} value={email} name="userId" className="userid-input" type="text"/>
              </Paper>
              <Paper >
              <div  align="left" className="userid">pwd</div>
                <input  onChange={changeHandler} value={pwd} name="userPassword" className="userPassword-input" type="text"/>
              </Paper>
              
              <button className = 'submit' onClick={signinHandler}>login</button>
            </Grid>
            
          </Grid> */}
      </div>
  )
}

export default Login;