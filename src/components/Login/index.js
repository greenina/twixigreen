import './style.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { db, firebaseApp } from '../../firebase';
import {useHistory} from 'react-router-dom'
import setUser from '../../reducers/user'//action creator
import user from '../../reducers/user'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function Login(){
  const classes = useStyles();

  const[email, setEmail] = useState("");
  const[pwd, setPwd] = useState("");
  const[success, setSuccess] = useState();
  const[error, setError] = useState("");
  let history = useHistory();
  const selector = useSelector((store)=>store.user.user)
  const dispatch = useDispatch();

  var changeEmail = (e) =>{
      setEmail(e.target.value)
  }
  var changePwd = (e) =>{
      setPwd(e.target.value)
  }
  var goRegister = () =>{
    history.replace('register')
  }

  const signinHandler = () => {
    debugger;
    console.log("email",email)
    console.log("pwd",pwd)
    debugger;
  firebaseApp.auth().signInWithEmailAndPassword(email, pwd)
  .then((userCredential) => {
    // Signed in
    debugger;
    var user = userCredential.user;
    console.log("user",user)
    //dispatch(setUser());
    history.replace('/main');
    // ...
  })
  .catch((error) => {
    console.log("error",error)
    var errorCode = error.code;
    var errorMessage = error.message;
  });

  }

  return(
    <div className="root">
      {/* <img src="/images/bukkuk.gif"/> */}
      <div>
        {/* <div className="apply_title">Login</div>
      <div  align="left" className="userid">email</div>
                <input  onChange={changeEmail} value={email} name="email" className="userid-input" type="text"/>
      <div  align="left" className="userid">pwd</div>
                <input  onChange={changePwd} value={pwd} name="pwd" className="userPassword-input" type="text"/>
      <button className = 'submit' onClick={signinHandler}>login</button>
      <button className = 'submit' onClick={goRegister}>register</button> */}
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={changeEmail} 
            value={email}
            id="firstName"
            name="firstName"
            label="email"
            fullWidth
            
          />
        </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange={changePwd} 
            value={pwd}
            id="firstName"
            name="firstName"
            label="password"
            fullWidth
          />
        </Grid>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <button className = 'submit' onClick={signinHandler}>login</button>
          {/* <Button
            onClick={signinHandler}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button> */}
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link onClick={goRegister}  variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
      </div>
      
        
          
      </div>
  )
}

export default Login;