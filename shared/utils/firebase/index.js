import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './config';

export default initializeApp(firebaseConfig);

export const db = getFirestore();

export * from './createAccount';
