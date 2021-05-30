import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NavBar from './NavBar';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from './config/store';
const {store, persistor} = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate laoding={null} persistor={persistor}>
      <NavBar />
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <NavBar />
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
// store.subscribe(()=> {
//   console.log(store.getState())
//   // debugger;
// })

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store = {store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <NavBar />
//         <App />
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>
//   ,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
