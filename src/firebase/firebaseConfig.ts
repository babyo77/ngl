import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { Messaging, getMessaging } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyC3UYt7dxYgR-8T1DgdZT86pwi5JmKLF2Y",
  authDomain: "ngl-drx-prod.firebaseapp.com",
  projectId: "ngl-drx-prod",
  storageBucket: "ngl-drx-prod.appspot.com",
  messagingSenderId: "162610520917",
  appId: "1:162610520917:web:e039ca4f4c659eeafa05dc",
  measurementId: "G-C7VFF3RJ2P",
};

let messaging: Messaging | null = null;
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const msgCollection = collection(db, "messages");
export const usersCollection = collection(db, "users");
export const storage = getStorage(app);
if ("serviceWorker" in navigator) {
  messaging = getMessaging(app);
}
export { messaging };
export const googleAuthProvider = new GoogleAuthProvider();

export default app;
