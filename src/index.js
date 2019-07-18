import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reduxStore from './components/bindings/redux';
import { setLoggedIn , setLoggedOut } from './components/bindings/redux';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// --- Redux ---
const store = createStore(reduxStore);
console.log(store.getState().user);
function handleChange() {
  console.log(store.getState().user);
}
store.subscribe(handleChange);

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
firebase.auth().onAuthStateChanged(user => {
  if(user){
    usersDb.doc(user.uid).get().then(databaseUser => {
      // The case when user is in the database
      // And is authenticated
      if(databaseUser.exists){
        const userData = databaseUser.data()
        store.dispatch(setLoggedIn({
          uid:user.uid,
          color:userData.color,
          icon:userData.icon,
          image:userData.image,
          likes:userData.likes,
          permissions:userData.permissions,
          username:userData.username
        }));
      // The case when a user is not in the database
      // but is authenticated
      }else{
        // Should have already been done?
        // Temporary user?
      }
    }).catch(error => {
      console.error(error);
    });
  }else{
    store.dispatch(setLoggedOut());
  }
});

setTimeout(function(){
  firebase.auth().signInWithEmailAndPassword("jacob.alford@me.com", "E@*^}bJ6*ct.ECY-MEdmsttxrmc4HX!-KB:x>C.on4.vi^wKh_d+FJGCfyb4M9:.").catch(function(error) {
    console.log(error);
  });
},5000);

// --- Root Render ---
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
