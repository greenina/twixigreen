import logo from './logo.png';
import './NavBar.css';
import { db, firebaseApp } from './firebase';
import {useEffect, useState} from 'react';
import MyPage from './components/MyPage';
import setUser from './reducers/user'
import {useDispatch, useSelector} from 'react-redux'

function NavBar() {
  console.log("aaaa")
  const mv2main = () => {
    document.location.href = '/main';
  };
  const [signIn, setSignIn] = useState(false);
  const [email, setEmail] = useState('1')
  var dispatch = useDispatch();
  const mail = useSelector(state => state.user.user)

  useEffect(()=>{
    firebaseApp.auth().onAuthStateChanged(function(user) {
      if (user) {
        setSignIn(true);
        setEmail(user.email)
      } 
    });
  },[signIn])
  
  var logOut = () =>{
    firebaseApp.auth().signOut().then(() => {
   console.log("log out")
   //dispatch(setUser('1'));
   setEmail('1')
   setSignIn(false)
   
    }).catch((error) => {
    // An error happened.
    });
  }
  console.log("useSelector on NavBar",useSelector(state => state.user))

  return (
    <div className="NavBar">
      <header className="NavBar-header">
        <img onClick={mv2main} src={logo} className="NavBar-logo" alt="logo" />
        <nav>
          <ul className="nav__links">
            <li>
              <a href="/category/living">Living</a>
            </li>
            <li>
              <a href="/category/kitchen">Kitchen</a>
            </li>
            <li>
              <a href="/category/bath">Bathroom</a>
            </li>
            <li>
              <a href="/category/beauty">Bedroom</a>
            </li>
            {/* <li><a href="/detail">Details</a></li> */}
            {/*<li><a href="/mypage">Mypage</a></li>*/}
            <li>|</li>
          </ul>
        </nav>
        {signIn?<a className="cta" href="/mypage">
          <button className="login">MyPage</button>
        </a>:<a className="cta" href="/">
          <button className="login">Login</button>
        </a>}
        
        <button onClick={logOut}className="logout">Logout</button>
        <div>{email!=1?email:"undefined"}</div>
      </header>
    </div>
  );
}

export default NavBar;
