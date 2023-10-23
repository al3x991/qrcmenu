// Your web app's Firebase configuration

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyB0SlXwzuD4e6U1i8sQESX2PVCClesA1vU",
    authDomain: "lagospoloclub-6f778.firebaseapp.com",
    projectId: "lagospoloclub-6f778",
    storageBucket: "lagospoloclub-6f778.appspot.com",
    messagingSenderId: "337139075063",
    appId: "1:337139075063:web:860a247eb38746641450f2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);

export { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };