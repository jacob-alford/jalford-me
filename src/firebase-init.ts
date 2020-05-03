import firebaseConfig from 'firebase-config';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

firebase.initializeApp(firebaseConfig);

export default firebase;
