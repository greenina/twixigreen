import './App.css';
import MainPage from './components/MainPage';
import CategoryPage from './components/CategoryPage';
import DetailPage from './components/DetailPage';
import MyPage from './components/MyPage';
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import * as ROUTES from './constants/routes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.MAIN} exact component={MainPage} />
        <Route exact path={ROUTES.CATEGORY} exact component={CategoryPage} />
        <Route exact path={ROUTES.DETAIL} exact component={DetailPage} />
        {/* <Route path="/detail/:name/:price/:img/:link" component={DetailPage} /> */}
        <Route exact path={ROUTES.MYPAGE} exact component={MyPage} />
        {/* <Redirect to="/" /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
