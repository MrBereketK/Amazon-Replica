import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqsdTfsj3uHSp7Z9Lm7yHrx_vKYY-dGhw",
  authDomain: "replica-e588b.firebaseapp.com",
  projectId: "replica-e588b",
  storageBucket: "replica-e588b.firebasestorage.app",
  messagingSenderId: "441827606775",
  appId: "1:441827606775:web:2254243d6bda3dccad53f2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
