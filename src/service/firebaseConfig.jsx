// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhXWQVqZZSM2kMofNEzfnXmLkYPk2GD7U",
  authDomain: "ai-travel-c0585.firebaseapp.com",
  projectId: "ai-travel-c0585",
  storageBucket: "ai-travel-c0585.firebasestorage.app",
  messagingSenderId: "107106873099",
  appId: "1:107106873099:web:43a20b32b77aa50e177c0e",
  measurementId: "G-J3FMFS4RSH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

//  export {db};