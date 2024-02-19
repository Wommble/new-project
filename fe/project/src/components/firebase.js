import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAOx3ekeLPpZ-SYNJ0faIo6eeua8HUhQEo",
  authDomain: "quiz-56e6d.firebaseapp.com",
  projectId: "quiz-56e6d",
  storageBucket: "quiz-56e6d.appspot.com",
  messagingSenderId: "553507213836",
  appId: "1:553507213836:web:4681aabbf6b47946b25429",
  measurementId: "G-ZJSNBPJ1H0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
