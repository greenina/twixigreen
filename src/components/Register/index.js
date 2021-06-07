import './style.css';
import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { db, firebaseApp } from '../../firebase';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { styled } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Input from '@material-ui/core/Input';

const MyButton = styled(Button)({
  background: 'green',
  border: 0,
  borderRadius: 3,
  // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});
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

function Register() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [name, setName] = useState('');
  const [mode, setMode] = useState(false);
  const [error, setError] = useState('');
  const [uid, setUid] = useState(null);
  const [comp, setComp] = useState('');
  const [img, setImg] = useState([]);
  let history = useHistory();

  var changeEmail = (e) => {
    setEmail(e.target.value);
  };
  var changePwd = (e) => {
    setPwd(e.target.value);
  };
  var changeName = (e) => {
    setName(e.target.value);
  };
  var changeComp = (e) => {
    setComp(e.target.value);
  };

  var goLogin = () => {
    history.replace('');
  };

  var submitHandler = () => {
    if (mode) {
      debugger;
      firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, pwd)
        .then((user) => {
          console.log('user', user);
          debugger;
          const uid = (firebaseApp.auth().currentUser || {}).uid;
          console.log('uid', uid);
          console.log('email', email);
          db.collection('users').add({ aaa: 'aaa' });
          db.collection('users').doc(email).set({
            experience: 0,
            name: name,
            comp: comp,
            score: 0,
            wished: [],
          });
          console.log('name', name);
          history.replace('/');
        })
        .catch((error) => {
          // console.log('mode', mode);
          // console.log('errorMessage', error.message);
          var errorCode = error.code;
          var errorMessage = error.message;
          // console.log('errorCode', errorCode);
          // console.log('errorMessage', errorMessage);
          alert(errorMessage);
        });
    } else {
      alert("The passwords don't match.");
    }
  };

  const signinHandler = () => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, pwd)
      .setPersistence(firebaseApp.auth.Auth.Persistence.SESSION)
      .then((user) => {
        console.log(user);
        const uid = (firebaseApp.auth().currentUser || {}).uid;
        console.log(uid);
        alert('signin!!');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        setError(errorMessage);
      });
  };

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      const uid = (firebaseApp.auth().currentUser || {}).uid;
      if (uid) {
        // alert(uid);
        setUid(uid);
        // alert()
      } else {
        //history.replace('/login');
      }
    });
    db.collection('companion')
      .doc('bukkuk')
      .get()
      .then(function (doc) {
        let docs = doc.data();
        setImg(docs.adult_dance);
      });
  }, []);

  const signoutHandler = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        console.log('firebase logout');
      });
  };

  var passwordHandler = (e) => {
    e.preventDefault();
    if (pwd === e.target.value) {
      setMode(true);
    } else {
      setMode(false);
    }
  };

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setPwd(event.target.value);
  };

  const [values2, setValues2] = React.useState({
    password: '',
    showPassword2: false,
  });
  const handleClickShowPassword2 = () => {
    setValues2({ ...values2, showPassword2: !values2.showPassword2 });
  };
  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };
  const handlePasswordChange2 = (prop) => (event) => {
    setValues2({ ...values2, [prop]: event.target.value });

    event.preventDefault();
    if (pwd === event.target.value) {
      setMode(true);
    } else {
      setMode(false);
    }
  };

  return (
    <div className="no-drag">
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Annie+Use+Your+Telescope&display=swap" rel="stylesheet"></link>
      <div className="root">
        
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid item xs={12} sm={60}>
              <Input
                className="input_login"
                onChange={changeEmail}
                placeholder="email *"
              />
            </Grid>
            <Grid item xs={12} sm={60}>
              <Input
                className="input_login"
                type={values.showPassword ? 'text' : 'password'}
                onChange={handlePasswordChange('password')}
                value={values.password}
                placeholder="password(at least 6 characters) *"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={12} sm={60}>
              <Input
                className="input_login"
                type={values2.showPassword2 ? 'text' : 'password'}
                onChange={handlePasswordChange2('password')}
                value={values2.password}
                placeholder="password confirm *"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword2}
                      onMouseDown={handleMouseDownPassword2}
                    >
                      {values2.showPassword2 ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
            {/* {mode?<div></div>:<div></div>} */}
            {mode ? (
              <div>pwd matches</div>
            ) : (
              <div className="red">pwd doesn't match</div>
            )}
            <Grid item xs={12} sm={60}>
              <Input
                className="input_login"
                onChange={changeName}
                placeholder="name *"
              />
            </Grid>
            <Grid item xs={12} sm={60}>
              <Input
                className="input_login"
                onChange={changeComp}
                placeholder="companion name *"
              />
            </Grid>
            <Grid item xs={12} sm={60}>
              <MyButton
                className="submit"
                onClick={submitHandler}
                color="secondary"
                className={classes.submit}
                fullWidth
              >
                sign up
              </MyButton>
            </Grid>

            <Grid container>
              <Grid item>
                <Link onClick={goLogin} className="signin">{'Already have an account? Sign In'}</Link>
              </Grid>
            </Grid>
            {error}
          </form>
        </div>
      </Container>
      </div>
      <div className="register_comp">
        <div className="textballoon">
          <img className="registertext"src="/images/registertext.png"/>
          <div className="texts">
            {name!=""?<div >Welcome {name}</div>:<div></div>}
            {comp!=""?<div >My name is {comp}</div>:<div><div >I am your companion</div><div>Would you name me?</div></div>}
          </div>
        </div>
        <img  width="300px" src="/images/bukkuk.gif" />
      </div>
      
    </div>
  );
}

export default Register;
