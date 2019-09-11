import React , { useEffect , useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ParallaxProvider } from 'react-scroll-parallax';

import GlobalStateProvider from 'globalState';
import { useDispatch } from 'globalState';

import { firebaseConfig } from './firebase.js';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// --- Firebase ---
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const usersDb = db.collection("users");

const Root = () => {
  const [setLoggedIn,setLoggedOut] = useDispatch(['login','logout'],'user');
  const unsubscribe = useRef(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        if(unsubscribe.current) unsubscribe.current();
        unsubscribe.current = usersDb.doc(user.uid).onSnapshot(databaseUser => {
          if(databaseUser.exists){
            const userData = databaseUser.data();
            setLoggedIn({
              user:{
                uid:user.uid,
                color:userData.color,
                icon:userData.icon,
                image:userData.image,
                likes:userData.likes,
                permissions:userData.permissions,
                username:userData.username
              }
            });
          }else{
            setLoggedOut();
          }
        });
      }else{
        if(unsubscribe.current) unsubscribe.current();
        setLoggedOut();
      }
    });
  });
  return (
    <ParallaxProvider>
      <App />
    </ParallaxProvider>
  );
}

// --- Root Render ---
ReactDOM.render(
  <GlobalStateProvider>
    <Root />
  </GlobalStateProvider>,
  document.getElementById('root')
);

export { firebase };

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
