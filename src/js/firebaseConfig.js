// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configurația Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDrd_KvEGuwilx5RdujaK_pqSPDHDc4E0g",
  authDomain: "filmoteca-7c24f.firebaseapp.com",
  projectId: "filmoteca-7c24f",
  storageBucket: "filmoteca-7c24f.appspot.com",
  messagingSenderId: "402223407588",
  appId: "1:402223407588:web:dce7169508831ac408a7f1",
  measurementId: "G-587DCBWCDY",
};

// Inițializați Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
