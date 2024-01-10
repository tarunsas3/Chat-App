import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAsJ0SxFd0w2k6zGN-DMpmEXbcPVtxGPvA",
  authDomain: "chat-c77b3.firebaseapp.com",
  projectId: "chat-c77b3",
  storageBucket: "chat-c77b3.appspot.com",
  messagingSenderId: "342510640709",
  appId: "1:342510640709:web:a75d7aa7a0232b30c20d2c"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
