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
    const [comp, setComp] = useState("Bukkuk");
    const [img, setImg] = useState([]);
    let history = useHistory();

 
 
  var changeEmail = (e) =>{
      setEmail(e.target.value)
  }
  var changePwd = (e) =>{
      setPwd(e.target.value)
  }
  var changeName = (e) =>{
    setName(e.target.value)
  }
  var changeComp = (e) =>{
    setComp(e.target.value);
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
        console.log("email",email)
        db.collection('users')
        .add({"aaa":"aaa"})
        db.collection('users')
        .doc(email).set({
          experience:0,
          name:name,
          comp:comp,
          score:0,
          wished:[]
        })
        console.log("name",name)
        history.replace('/');
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
        //history.replace('/login');
      }
    })
    db.collection('companion')
      .doc('bukkuk')
      .get()
      .then(function (doc) {
        let docs = doc.data();
        setImg(docs.adult_dance);
      });
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
                <input  onChange={changeEmail} value={email} name="email" className="userid-input" type="text"/>
          <div  align="left" className="userid">password</div>
                <input  onChange={changePwd} value={pwd} name="pwd" className="userPassword-input" type="text"/>
          <div  align="left" className="userid">confirm password</div>
                <input  onChange={passwordHandler}  name="userPasswordConfirm" className="userPassword-input" type="text"/>
                {mode?<div className="green">pwd matches</div>:<div className="red">pwd doesn't match</div>}
          <div  align="left" className="name">name</div>
                <input  onChange={changeName} value={name} name="name" className="userPassword-input" type="text"/>
          <div>
            <img src={img}/>
            <div>What will you name me?</div>
                <input  onChange={changeComp} value={comp} name="comp" className="userPassword-input" type="text"/>
          </div>
          <button className = 'submit' onClick={submitHandler}>Sign up</button>
      </div>)
}

export default Register;