import './style.css';
import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { db, firebaseApp } from '../../firebase';
import {useSelector, useDispatch} from 'react-redux';
import setUser from '../../reducers/user'
import {useHistory} from 'react-router-dom'

function Register(){

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [name, setName] = useState("");
    const [mode, setMode] = useState(false);
    const [error, setError] = useState("");
    const [uid, setUid] = useState(null);
    const mail = useSelector(state => state.user.user)
    const [a, setA] = useState(mail);
    let history = useHistory();
 
  var changeEmail = (e) =>{
      setEmail(e.target.value)
  }
  var changePwd = (e) =>{
      setPwd(e.target.value)
  }

  var submitHandler = () =>{
    if(mode){
      debugger;
      firebaseApp.auth().createUserWithEmailAndPassword(email, pwd)
      .then((user)=>{
        console.log("user",user);
        debugger;
        const uid = (firebaseApp.auth().currentUser||{}).uid;
        console.log("uid",uid);
        history.replace('/login')
      })
      .catch((error)=>{
        console.log("mode",mode)
        console.log("errorMessage",error.message)
        debugger;
        console.log("AAAAAAAAAAAA");
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("errorCode",errorCode);
        console.log("errorMessage",errorMessage)
        
      })
    }
    else{
      alert('비밀번호가 일치하지 않습니다')
    }
  }

    const signinHandler = () => {

    firebaseApp.auth().signInWithEmailAndPassword(email, pwd)
    .setPersistence(firebaseApp.auth.Auth.Persistence.SESSION)
    .then((user) => {
      console.log(user);
      const uid = (firebaseApp.auth().currentUser || {}).uid
      console.log(uid); 
      alert('signin!!');
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      setError(errorMessage);
    });

  }

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      const uid = (firebaseApp.auth().currentUser || {}).uid
      if(uid){
        // alert(uid);
        setUid(uid);
        // alert()
      }else{
        window.location = "/login"
      }
    })
  }, [])

  const signoutHandler = () => {
    firebaseApp.auth().signOut().then(() => {
      // history.push('/login');

      console.log('firebase logout');
    })
  }
  
  var passwordHandler = (e) =>{
    e.preventDefault();
    if(pwd === e.target.value){
      setMode(true)
    }else{
      setMode(false)
    }
  }

    return(<div className="recruit">
      <h1>{mail}</h1>
          <div  align="left" className="userid">Email</div>
                <input  onChange={changeEmail} value={email} name="userId" className="userid-input" type="text"/>
          <div  align="left" className="userid">password</div>
                <input  onChange={changePwd} value={pwd} name="userPassword" className="userPassword-input" type="text"/>
          <div  align="left" className="userid">confirm password</div>
                <input  onChange={passwordHandler}  name="userPasswordConfirm" className="userPassword-input" type="text"/>
                {mode?<div className="green">pwd matches</div>:<div className="red">pwd doesn't match</div>}
          <button className = 'submit' onClick={submitHandler}>Sign up</button>
          <button className = 'sign in' onClick={signinHandler}>Sign in</button>
          <button className = 'sign in' onClick={signoutHandler}>Sign in</button>
      </div>)
}

export default Register;