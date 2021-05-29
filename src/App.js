import './App.css';
import MainPage from './components/MainPage';
import CategoryPage from './components/CategoryPage';
import DetailPage from './components/DetailPage';
import MyPage from './components/MyPage';
import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/category/:cg" exact component={CategoryPage} />
        <Route path="/detail" exact component={DetailPage} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        {/* <Route path="/detail/:name/:price/:img/:link" component={DetailPage} /> */}
        <Route path="/mypage" exact component={MyPage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
