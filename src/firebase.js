import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyABumQ-1yEMCZggQ_LqWLi4KC0RkUlNk1w",
  authDomain: "chat-6b0ba.firebaseapp.com",
  projectId: "chat-6b0ba",
  storageBucket: "chat-6b0ba.appspot.com",
  messagingSenderId: "420739357042",
  appId: "1:420739357042:web:82f09298c2a5c522be65eb",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
