// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAw6JIzlfn9fr7Ih_K69iro3KCNt0Kv5Zg",
  authDomain: "householdtypescript-e13e0.firebaseapp.com",
  projectId: "householdtypescript-e13e0",
  storageBucket: "householdtypescript-e13e0.firebasestorage.app",
  messagingSenderId: "21651200869",
  appId: "1:21651200869:web:994e5bbe72f19b50221f8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };