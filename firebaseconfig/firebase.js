/* eslint-disable import/no-unresolved */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// eslint-disable-next-line import/no-unresolved

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

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
