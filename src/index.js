import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reduxStore from './components/bindings/redux';

import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCnBTUMBl2xJVEqifbks8fTT6qjU8ykaI8",
  authDomain: "jalford-me.firebaseapp.com",
  databaseURL: "https://jalford-me.firebaseio.com",
  projectId: "jalford-me",
  storageBucket: "jalford-me.appspot.com",
  messagingSenderId: "740241394258",
  appId: "1:740241394258:web:8ff3404c581c763c"
};

firebase.initializeApp(firebaseConfig);

const store = createStore(reduxStore);

console.log(store.getState().user);

function handleChange() {
  console.log(store.getState().user);
}

store.subscribe(handleChange);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
