// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZkmowIfKeS-4vivIiZuQH6EUphUWZkXM",
  authDomain: "laishub-3fc12.firebaseapp.com",
  projectId: "laishub-3fc12",
  storageBucket: "laishub-3fc12.firebasestorage.app",
  messagingSenderId: "514942794219",
  appId: "1:514942794219:web:376b89c0b18cb94aa581ae",
  measurementId: "G-81TTWHV3NZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);