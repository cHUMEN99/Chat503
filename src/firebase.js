// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5WaF9NoBNm6Y_bk9Jl48TXlOs1e7h5MQ",
  authDomain: "legenda-dfe85.firebaseapp.com",
  projectId: "legenda-dfe85",
  storageBucket: "legenda-dfe85.firebasestorage.app",
  messagingSenderId: "316737335018",
  appId: "1:316737335018:web:fc39c7f1f29d8775c6f193"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db = getFirestore(app);

