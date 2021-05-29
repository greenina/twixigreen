import './style.css';
import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { db } from '../../firebase';

function Register(){

    const [id, setId] = useState();
    const [pwd, setPwd] = useState();
    const [mode, setMode] = useState(false);
 
  var changeId = (e) =>{
      setId(e.target.value)
  }
  var changePwd = (e) =>{
      setPwd(e.target.value)
  }

  var submitHandler = (e) =>{
    if(mode){
      e.preventDefault();
      db.collection('users')
      .doc(id).set({pwd:pwd},{merge: true})
      console.log("id",id)
      console.log("pwd",pwd)
    alert('회원가입에 성공하셨습니다.')
    //document.location.href('/login')
    }
    else{
      alert('비밀번호가 일치하지 않습니다')
    }
    

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
        <form  onSubmit={submitHandler}  alignItems="center" justify="center">
          <Grid align="center"
                justify="center"
                direction="column"
                className="format"  
                alignItems="center" 
                justify="center">
            <Grid item xs={5} alignItems="center" justify="center">
              <div className="blank"></div>
              <Paper className="titlePaper" >
                <div className="apply_title">회원 가입</div>
              </Paper>
              <div className="blank1"></div>
              <Paper >
              <div  align="left" className="userid">id</div>
                <input  onChange={changeId} value={id} name="userId" className="userid-input" type="text"/>
              </Paper>
              <Paper >
              <div  align="left" className="userid">password</div>
                <input  onChange={changePwd} value={pwd} name="userPassword" className="userPassword-input" type="text"/>
              </Paper>
              <Paper >
                <div  align="left" className="userid">confirm password</div>
                <input  onChange={passwordHandler}  name="userPasswordConfirm" className="userPassword-input" type="text"/>
                {mode?<div className="green">비밀번호가 일치합니다</div>:<div className="red">비밀번호가 일치하지 않습니다.</div>}
              </Paper>
              

              <button className = 'submit' onClick={submitHandler}>완료</button>
            </Grid>

          </Grid>

        </form>
      </div>)
}

export default Register;