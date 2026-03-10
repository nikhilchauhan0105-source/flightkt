// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvHZrnekzk5991tkQroikqbSuAs15ghWY",
  authDomain: "flight-kt.firebaseapp.com",
  projectId: "flight-kt",
  storageBucket: "flight-kt.firebasestorage.app",
  messagingSenderId: "849938683667",
  appId: "1:849938683667:web:190975e1e02e2cb0702ce6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


export default app;

