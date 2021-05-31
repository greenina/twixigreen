import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NavBar from './NavBar';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import persistedReducer from './reducers/index'
import { persistStore } from "redux-persist";


const store = createStore(persistedReducer, composeWithDevTools());
const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavBar />
      <App />
    </PersistGate>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
