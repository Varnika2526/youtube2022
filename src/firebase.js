import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCK59VcGN9pR2TgoaQwNMQy6WcbpfRuSuQ",
  authDomain: "chat-de048.firebaseapp.com",
  projectId: "chat-de048",
  storageBucket: "chat-de048.appspot.com",
  messagingSenderId: "157154853261",
  appId: "1:157154853261:web:e0dd5256c9e81edfdebdc4"
};


export const app = initializeApp(firebaseConfig);
export const auth  = getAuth();
export const storage = getStorage();
export const db = getFirestore();