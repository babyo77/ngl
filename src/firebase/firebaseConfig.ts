import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTb6PAR7CyJzH6R1GkT0pZwgVI3Msv-2c",
  authDomain: "ngldrx.firebaseapp.com",
  projectId: "ngldrx",
  storageBucket: "ngldrx.appspot.com",
  messagingSenderId: "1011251421809",
  appId: "1:1011251421809:web:89f1238ed265a12052b1d0",
  measurementId: "G-S54D629J4V"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();

export default app
