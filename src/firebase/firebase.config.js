// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaTnBwHiigseRAGcMPCnv9_jPei0KhEFA",
  authDomain: "assignment-12-128a0.firebaseapp.com",
  projectId: "assignment-12-128a0",
  storageBucket: "assignment-12-128a0.firebasestorage.app",
  messagingSenderId: "1092157040767",
  appId: "1:1092157040767:web:7b9da85867c5a0b885b74a",
  measurementId: "G-DYVL9KLH9C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth }; 
