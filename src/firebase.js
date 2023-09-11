// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxYoJolzxTRxTMX1MMGPcXrl2aHxUKKn4",
  authDomain: "social-media-f7742.firebaseapp.com",
  projectId: "social-media-f7742",
  storageBucket: "social-media-f7742.appspot.com",
  messagingSenderId: "197844303954",
  appId: "1:197844303954:web:9e2367c6a179449cae5f8b",
  measurementId: "G-TZMRBJ5WX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;