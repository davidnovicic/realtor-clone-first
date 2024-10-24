// Import the functions you need from the SDKs you nee
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-KjSRmlp6Mwt--KTpO9y3U0eE1OdjQHU",
  authDomain: "realtor-clone-service.firebaseapp.com",
  projectId: "realtor-clone-service",
  storageBucket: "realtor-clone-service.appspot.com",
  messagingSenderId: "667830268284",
  appId: "1:667830268284:web:964a1d2611423fc83374f9",
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
