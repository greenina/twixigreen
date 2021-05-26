import logo from './logo.png';
import './NavBar.css';

function NavBar() {
  const mv2main = () => {
    document.location.href = '/';
  };

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
          <button className="login">My Page</button>
        </a>
      </header>
    </div>
  );
}

export default NavBar;
