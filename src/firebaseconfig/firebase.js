// Import the functions you need from the SDKs you need
// eslint-disable-next-line import/no-unresolved
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js';
// eslint-disable-next-line import/no-unresolved
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import * as test from 'https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js';

console.log(initializeApp, getAuth, test);
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBFhf_NaW24WrzT1_-UQzT1JbqBxrym8MQ',
  authDomain: 'patitas-preciosas.firebaseapp.com',
  projectId: 'patitas-preciosas',
  storageBucket: 'patitas-preciosas.appspot.com',
  messagingSenderId: '829661614696',
  appId: '1:829661614696:web:7f0e4591d634021d89a1dd',
  measurementId: 'G-ZPNZHM3T8W',
};
// aqui deben ir todo las funciones de firebase y firestore
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const register = (gmail, password) => createUserWithEmailAndPassword(auth, gmail, password);
console.log(register)