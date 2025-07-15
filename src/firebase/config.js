// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoHVz5EoFd7tdE__50xm8rIArXG0nYPvs",
  authDomain: "miniblog-45975.firebaseapp.com",
  projectId: "miniblog-45975",
  storageBucket: "miniblog-45975.firebasestorage.app",
  messagingSenderId: "417201247163",
  appId: "1:417201247163:web:2b4820f5b628024987aa9e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };