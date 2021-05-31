import logo from './logo.png';
import './NavBar.css';
import { db, firebaseApp } from './firebase';
import {useEffect, useState} from 'react';
import MyPage from './components/MyPage';
import setUser from './reducers/action'
import {useDispatch, useSelector} from 'react-redux'

function NavBar() {
  console.log("aaaa")
  const mv2main = () => {
    document.location.href = '/';
  };
  const [signIn, setSignIn] = useState(false);
  var dispatch = useDispatch();
  const mail = useSelector(state => state.user.user)

  useEffect(()=>{
    firebaseApp.auth().onAuthStateChanged(function(user) {
      console.log("user",user)
      if (user) {
        setSignIn(true);
      } 
    });
  },[])
  
  var logOut = () =>{
    firebaseApp.auth().signOut().then(() => {
   console.log("log out")
   dispatch(setUser('1'));
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
        <a className="cta" href="/mypage">
          <button className="login">{signIn?"MyPage":"Login"}</button>
        </a>
        <button onClick={logOut}className="logout">Logout</button>
        <div>{mail?mail:"undefined"}</div>
      </header>
    </div>
  );
}

export default NavBar;
