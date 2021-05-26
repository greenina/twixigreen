import './App.css';
import MainPage from './components/MainPage';
import CategoryPage from './components/CategoryPage';
import DetailPage from './components/DetailPage';
import MyPage from './components/MyPage';
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/category/:cg" exact component={CategoryPage} />
        <Route path="/detail" exact component={DetailPage} />
        {/* <Route path="/detail/:name/:price/:img/:link" component={DetailPage} /> */}
        <Route path="/mypage" exact component={MyPage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
