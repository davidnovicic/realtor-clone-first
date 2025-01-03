// Import the functions you need from the SDKs you nee
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjLEr3aCGBe19T1H1f8ul2FMNOZe1Q2ZE",
  authDomain: "realtor-clone-react-9ae5f.firebaseapp.com",
  projectId: "realtor-clone-react-9ae5f",
  storageBucket: "realtor-clone-react-9ae5f.firebasestorage.app",
  messagingSenderId: "620936116188",
  appId: "1:620936116188:web:97cb99387511d9a5e8c119",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();

const provider = new GoogleAuthProvider();

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
