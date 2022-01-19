// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDj7ZJKayILGjDmbLEp5fvtacap5YINLEU',
  authDomain: 'boatabroad-app.firebaseapp.com',
  projectId: 'boatabroad-app',
  storageBucket: 'boatabroad-app.appspot.com',
  messagingSenderId: '724790979766',
  appId: '1:724790979766:web:5cae55f4d590adf4c04a17',
};

// Initialize Firebase
initializeApp(firebaseConfig);

export * from './createAccount';
 