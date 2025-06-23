import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuration Firebase - Clés réelles
const firebaseConfig = {
  apiKey: "AIzaSyD_nPXRF5O5-JnDoWe9fLb9hJxhuBz9CX8",
  authDomain: "tennis-outremont.firebaseapp.com",
  projectId: "tennis-outremont",
  storageBucket: "tennis-outremont.firebasestorage.app",
  messagingSenderId: "375231312386",
  appId: "1:375231312386:web:210ab07575a518dc83ad1b",
  measurementId: "G-J6J7G35K1N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app; 