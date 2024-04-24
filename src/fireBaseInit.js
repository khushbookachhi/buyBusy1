// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4MfRxuNYeil6gkc3WQ749OeW2ldJP-q0",
  authDomain: "buybusy1-9b8e1.firebaseapp.com",
  projectId: "buybusy1-9b8e1",
  storageBucket: "buybusy1-9b8e1.appspot.com",
  messagingSenderId: "1097736031967",
  appId: "1:1097736031967:web:f9149c1c76fbf51b77e36a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);