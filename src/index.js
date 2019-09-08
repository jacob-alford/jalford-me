import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reduxStore from './components/bindings/redux';
import { setLoggedIn , setLoggedOut , setLoggedOutWithWater } from './components/bindings/redux';

import { ParallaxProvider } from 'react-scroll-parallax';

import NotificationProvider from './notifications.js';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// --- Notifications ---
const Notifications = React.createContext({notifications:[]});

// --- Redux ---
const store = createStore(reduxStore);

// --- Firebase ---
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
const db = firebase.firestore();
const usersDb = db.collection("users");
let unsubscribe;
firebase.auth().onAuthStateChanged(user => {
  if(user){
    if(unsubscribe) unsubscribe();
    unsubscribe = usersDb.doc(user.uid).onSnapshot(databaseUser => {
      if(databaseUser.exists){
        const userData = databaseUser.data();
        store.dispatch(setLoggedIn({
          uid:user.uid,
          color:userData.color,
          icon:userData.icon,
          image:userData.image,
          likes:userData.likes,
          permissions:userData.permissions,
          username:userData.username
        }));
      }else{
        store.dispatch(setLoggedOut());
      }
    });
  }else{
    if(unsubscribe) unsubscribe();
    store.dispatch(setLoggedOutWithWater());
  }
});

// --- Root Render ---
ReactDOM.render(
  <Provider store={store}>
    <NotificationProvider>
      <ParallaxProvider>
        <App />
      </ParallaxProvider>
    </NotificationProvider>
  </Provider>,
  document.getElementById('root')
);

export { firebase , Notifications };

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
