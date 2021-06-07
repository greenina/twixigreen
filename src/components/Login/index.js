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
  palette: {
    primary: 'purple',
    secondary: 'green',
    error: 'red',
  },
}));

function Login() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [success, setSuccess] = useState();
  const [error, setError] = useState('');
  let history = useHistory();

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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      signinHandler();
    }
  };

  var changeEmail = (e) => {
    setEmail(e.target.value);
  };
  var changePwd = (e) => {
    setPwd(e.target.value);
  };
  var goRegister = () => {
    history.replace('register');
  };

  const signinHandler = () => {
    //console.log('email', email);
    //console.log('pwd', pwd);
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, pwd)
      .then((userCredential) => {
        // Signed in
        debugger;
        var user = userCredential.user;
        console.log('user', user);
        //dispatch(setUser());
        history.replace('/main');
        // ...
      })
      .catch((error) => {
        console.log('error', error);
        alert(error.message);
      });
  };

  return (
    <div className="no-drag">
      <img className="login_comp" width="300px" src="/images/bukkuk.gif" />
      <div className="root">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Sign in
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
                  onKeyPress={handleKeyPress}
                  value={values.password}
                  placeholder="password *"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12} sm={60}>
                <MyButton
                  className="submit"
                  color="secondary"
                  className={classes.submit}
                  onClick={signinHandler}
                  fullWidth
                >
                  login
                </MyButton>
              </Grid>

              <Grid container>
                <Grid item>
                  <Link onClick={goRegister} className="signup">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
      <div className="explain">
        <div>
          {' '}
          ** This step is taken to prevent data from overlapping in the DB when
          multiple people are testing simultaneously.
        </div>
        <div>
          {' '}
          It is not related to the core test of our prototype, but we ask you to
          proceed to experience the proper test flow. **
        </div>
      </div>
    </div>
  );
}

export default Login;
