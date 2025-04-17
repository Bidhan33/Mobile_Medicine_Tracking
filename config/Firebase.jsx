// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-mwRvxRExtRH2dXTks5wkW__ba66g81w",
  authDomain: "medicine-c09c0.firebaseapp.com",
  projectId: "medicine-c09c0",
  storageBucket: "medicine-c09c0.firebasestorage.app",
  messagingSenderId: "409725524671",
  appId: "1:409725524671:web:0133364bc9caeff0ac840a",
  measurementId: "G-578NQW5C4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const db=getFirestore(app)