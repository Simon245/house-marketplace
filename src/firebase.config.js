// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBzyA-frWgAL3npMunczbmYBNy2tTxNg2E',
  authDomain: 'house-marketplace-app-ae4f7.firebaseapp.com',
  projectId: 'house-marketplace-app-ae4f7',
  storageBucket: 'house-marketplace-app-ae4f7.appspot.com',
  messagingSenderId: '881521043212',
  appId: '1:881521043212:web:bb835b3e8c5d385da2cb29',
};

// Initialize Firebase
initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore();
