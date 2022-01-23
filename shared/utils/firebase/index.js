import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// import * as database from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
export default initializeApp(firebaseConfig);

export const db = getFirestore();
// getDocs(collection(db, 'boats')).then((boats) => {
//   console.log('got boats!', boats);
// });

export * from './createAccount';
